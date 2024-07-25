import * as pin from 'pinia';
import { ref } from 'vue';
import { UserProps } from './auth.type';

const useAuthStore = pin.defineStore('auth', () => {
  const is_authorized = ref<boolean>(true); // bypass
  const user = ref<UserProps>({
    name: 'นพ. ทดสอบ ระบบแพทย์',
    orgName: 'กระทรวงสาธารณะสุข',
    username: 'test01',
    departmentName: 'กรมควบคุมโรค',
    image: '',
  }); // dumpmy data

  function authenticate(status: boolean, user?: UserProps) {
    is_authorized.value = status;
    user = user;
  }

  return {
    //State
    is_authorized,
    user,
    //Actions
    authenticate,
  };
});

export default {
  useAuthStore,
};
