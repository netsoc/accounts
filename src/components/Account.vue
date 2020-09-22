<template>
  <div id="account_container">
    <div>
      <div>
        <span>Username:</span>
        <span>{{user.username}}</span>
      </div>
      <button v-on:click="edit_username = !edit_username">Edit Username</button>
      <input v-if="edit_username" v-model="new_username" placeholder="Your new username" />
      <div>
        <span>Email:</span>
        <span>{{user.email}}</span>
      </div>
      <button v-on:click="edit_email = !edit_email">Edit Email</button>
      <input v-if="edit_email" v-model="new_email" placeholder="Your new email" />
      <input v-if="edit_email" v-model="new_email_verify" placeholder="Your new email" />
      <div>
        <span>Name:</span>
        <span>{{user.first_name}} {{user.last_name}}</span>
      </div>
      <button v-on:click="edit_name = !edit_name">Edit Name</button>
      <input v-if="edit_name" v-model="new_first_name" placeholder="Your first name" />
      <input v-if="edit_name" v-model="new_last_name" placeholder="Your last name" />
      <button v-on:click="updateUserData" :disabled="!modifyEnabled">Update Account</button>
    </div>
    <div>
      <span>Last Renewed:</span>
      <span>{{renewedDateString}}</span>
      <button v-if="isExpired" v-on:click="toPayments">Renew Account</button>
    </div>
  </div>
</template>

<script>
const axios = require("axios").default;
import * as userFn from "./utils/login";
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
      new_first_name: "",
      new_last_name: "",
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
      if (this.edit_password && !userFn.isValidPassword(this.new_password))
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
      if (renewedDate.getTime() === new Date("0001-01-01T00:00:00Z").getTime())
        return "Never";
      return renewedDate.getTime();
    },
    isExpired: function () {
      let renewedDate = new Date(this.user.renewed);
      return renewedDate.getTime() <= new Date().getTime();
    },
  },
  methods: {
    getUserData() {
      let token = this.jwt;
      axios
        .get("http://localhost:8080/v1/users/self", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          this.$emit("userID", response.data.username);
          this.user = response.data;
        })
        .catch((response) => console.error(response));
    },
    updateUserData() {
      let token = this.jwt;
      let updatedObj = this.getUpdatedData();
      axios
        .patch("http://localhost:8080/v1/users/self", updatedObj, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          this.$emit("tokenUpdate", ""); // kill token
          this.$router.push({ name: "Login" });
        })
        .catch((err) => console.error(err));
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
  },
  beforeMount() {
    if (this.jwt.length < 1) {
      this.$router.push({ name: "Login" });
    }
    this.getUserData();
    this.modifyEnabled;
  },
};
</script>

<style scoped>
#account_container {
  border-radius: 1rem;
  border: 1px solid black;
}

.existing-data {
  grid-column: 1;
}

.new-data {
  grid-column: 2;
}

@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
}

.bouncing-loader {
  display: flex;
  justify-content: center;
}

.bouncing-loader > div {
  width: 1rem;
  height: 1rem;
  margin: 3rem 0.2rem;
  background: #8385aa;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}

.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}

.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
