<template>
  <div>
    <div>
      <div class="token-failure" v-if="failed_to_get_user">
        Sorry, we couldn't access the details of this account. Error:
        {{ account_error_response }}
      </div>
      <div v-else>
        <span>Username: </span>
        <span>{{ user.username }}</span>
      </div>
      <input
        class="input-field account-input-field"
        v-show="edit_username"
        v-model="new_username"
        :placeholder="user.username"
      />
      <button
        class="action-button account-button edit-button"
        v-on:click="edit_username = !edit_username"
      >
        Edit Username
      </button>
      <div>
        <span>Email: </span>
        <span>{{ user.email }}</span>
      </div>
      <input
        class="input-field account-input-field"
        v-show="edit_email"
        v-model="new_email"
        :placeholder="user.email"
      />
      <input
        class="input-field account-input-field"
        v-show="edit_email"
        v-model="new_email_verify"
        :placeholder="user.email"
      />
      <button
        class="action-button account-button edit-button"
        v-on:click="edit_email = !edit_email"
      >
        Edit Email
      </button>
      <input
        class="input-field account-input-field"
        v-show="edit_password"
        v-model="new_password"
        placeholder="Your new password"
        title="Password must be at least 8 characters long"
        type="password"
      />
      <input
        class="input-field account-input-field"
        v-show="edit_password"
        v-model="new_password_verify"
        placeholder="Your new password"
        title="Password must be at least 8 characters long"
        type="password"
      />
      <button
        class="action-button account-button edit-button"
        v-on:click="edit_password = !edit_password"
      >
        Edit Password
      </button>
      <div>
        <span>Name:</span>
        <span>{{ user.first_name }} {{ user.last_name }}</span>
      </div>
      <button
        class="action-button account-button edit-button"
        v-on:click="edit_name = !edit_name"
      >
        Edit Name
      </button>
      <input
        class="input-field account-input-field"
        v-show="edit_name"
        v-model="new_first_name"
        placeholder="Your first name"
      />
      <input
        class="input-field account-input-field"
        v-show="edit_name"
        v-model="new_last_name"
        placeholder="Your last name"
      />
      <button
        class="action-button account-button submit-button"
        v-on:click="updateUserData"
        :disabled="!modifyEnabled"
      >
        Update Account
      </button>
      <div>{{ update_error_message }}</div>
    </div>
    <div>
      <div>
        <span>Last Renewed:</span>
        <span>{{ renewedDateString }}</span>
      </div>
      <div>
        <span>Expires:</span>
        <span class="expires-comment">{{ expiryDateString }}</span>
      </div>
      <div v-if="neverRenewed" class="expires-comment never-renewed">
        Renew your account below to complete signup
      </div>
      <button
        class="action-button account-button renew-button"
        v-if="isExpired"
        v-on:click="toPayments"
      >
        Renew Account
      </button>
    </div>
    <button class="action-button account-button log-out" v-on:click="logout">
      Logout
    </button>
  </div>
</template>

<script>
const axios = require("axios").default;
import * as userFn from "./utils/login";
import * as tokenFn from "./utils/localToken";

export default {
  name: "Account",
  props: ["jwt"],
  data() {
    return {
      user: {},
      edit_username: false,
      edit_email: false,
      edit_password: false,
      edit_name: false,
      new_username: "",
      new_email: "",
      new_email_verify: "",
      new_password: "",
      new_password_verify: "",
      new_first_name: "",
      new_last_name: "",
      failed_to_get_user: false,
      account_error_response: "",
      update_error_message: "",
    };
  },
  computed: {
    modifyEnabled: function () {
      let hasEdited =
        this.edit_username ||
        this.edit_email ||
        this.edit_password ||
        this.edit_name;
      if (!hasEdited) return false;
      if (this.edit_username && !userFn.isValidUsername(this.new_username))
        return false;
      if (
        this.edit_email &&
        (!userFn.isValidEmail(this.new_email) ||
          !userFn.stringsMatch(this.new_email, this.new_email_verify))
      )
        return false;
      if (
        this.edit_password &&
        (!userFn.isValidPassword(this.new_password) ||
          !userFn.stringsMatch(this.new_password, this.new_password_verify))
      )
        return false;
      if (
        this.edit_name &&
        (this.new_last_name.length < 1 || this.new_first_name.length < 1)
      )
        return false;
      return true;
    },
    renewedDateString: function () {
      let renewedDate = new Date(this.user.renewed);
      if (renewedDate.getTime() <= new Date("2000-01-01T00:00:00Z").getTime())
        return "Never";
      return renewedDate.toDateString();
    },
    expiryDateString: function () {
      let tokenDate = new Date(
        JSON.parse(atob(this.jwt.split(".")[1]))["exp"] * 1000
      );
      return tokenDate.getTime() <= new Date("2000-01-01T00:00:00Z").getTime()
        ? "Never Renewed"
        : tokenDate.toDateString();
    },
    isExpired: function () {
      let renewedDate = new Date(this.user.renewed);
      return renewedDate.getTime() <= new Date().getTime();
    },
    logoutOnResponse: function () {
      return this.edit_password || this.edit_username || this.edit_email;
    },
    neverRenewed: function () {
      return this.expiryDateString === "Never Renewed";
    },
  },
  methods: {
    getUserData() {
      let token = this.jwt;

      // eslint-disable-next-line
      const URL = IAM_GET_USER_DATA_URL;

      axios
        .get(URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.$emit("userID", response.data.username);
          this.user = response.data;
        })
        .catch((error) => {
          this.failed_to_get_user = true;
          this.account_error_response = error.response.data.message;
          setTimeout(this.logout, 1500);
        });
    },
    updateUserData() {
      let token = this.jwt;
      let updatedObj = this.getUpdatedData();

      // eslint-disable-next-line
      const URL = IAM_UPDATE_USER_DATA_URL;

      const logoutOnResponse = this.logoutOnResponse;
      axios
        .patch(URL, updatedObj, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "text/html",
          },
        })
        .then(() => {
          if (logoutOnResponse) {
            this.logout();
          } else {
            this.resetEditOptions();
            this.getUserData();
          }
        })
        .catch((error) => {
          this.update_error_message = error.response?.data?.message;
          setTimeout(() => this.$router.push({ name: "Login" }), 1500);
        });
    },
    getUpdatedData() {
      let newUserObj = {};
      if (this.edit_username) newUserObj["username"] = this.new_username;
      if (this.edit_email) newUserObj["email"] = this.new_email;
      if (this.edit_password) newUserObj["password"] = this.new_password;
      if (this.edit_name) {
        newUserObj["first_name"] = this.new_first_name;
        newUserObj["last_name"] = this.new_last_name;
      }
      return newUserObj;
    },
    toPayments() {
      this.$emit("userID", this.user.username);
      this.$router.push({ name: "Renew" });
    },
    logout() {
      tokenFn.emitToken.bind(this)("");
      this.$router.push({ name: "Login" });
    },
    resetEditOptions() {
      this.edit_username = false;
      this.edit_email = false;
      this.edit_password = false;
      this.edit_name = false;
      this.new_username = "";
      this.new_email = "";
      this.new_email_verify = "";
      this.new_password = "";
      this.new_password_verify = "";
      this.new_first_name = "";
      this.new_last_name = "";
    },
  },
  beforeMount() {
    if (!tokenFn.checkForToken().hasToken) {
      this.$router.push({ name: "Login" });
    } else {
      this.getUserData();
      this.modifyEnabled;
    }
  },
};
</script>

<style scoped>
.token-failure {
  max-width: 18rem;
}

.account-input-field {
  width: 75%;
  margin-left: 2.2rem;
  height: 1rem;
  margin-bottom: 0.3rem;
}

.account-button {
  padding: 0.3rem;
  width: 70%;
  margin-left: 2.7rem;
  margin-bottom: 0.2rem;
}

.edit-button {
  background-color: rgb(151, 180, 210);
}

.submit-button {
  background-color: #ffb52c;
}

.submit-button:disabled {
  background-color: rgb(255, 223, 165);
  cursor: not-allowed;
}

.log-out {
  background-color: #c41818de;
}

.renew-button {
  background-color: rgba(165, 65, 42, 0.679);
}

.expires-comment {
  max-width: 11rem;
  display: inline-flex;
  overflow-wrap: break-word;
  text-align: left;
  padding-left: 0.3rem;
}

.never-renewed {
  max-width: 14rem;
  color: #ff0c00;
}
</style>
