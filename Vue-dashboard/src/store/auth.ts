import { defineStore } from "pinia"
export const useAuthStore = defineStore('auth', {
   state: () => ({
      token: "",
      user: null as null | {
            Name: string,
            Email: string,
            role:string

      }
   }),
   actions: {
      setToken(accessToken: string) {
         this.token = accessToken
      },

      setUser(user: {Email: string, Name: string,role:string }) {
         this.user = user;
      },


      logout() {
         this.accessToken = "";
         this.user = null;
      }
   }
})