<template>
  <div
    class="min-w-[250px] max-w-[250px] bg-[#f1f1f1] py-4 pt-[60px] flex flex-col"
  >
    <div class="flex flex-col gap-2.5 justify-center items-center px-4">
      <div class="bg-white rounded-full max-w-[140px] max-h-[140px] p-1 mb-4">
        <img
          src="@/assets/images/dummy-profile.png"
          class="w-full object-contain rounded-full"
        />
      </div>
      <div>{{ auth.user.name }}</div>
      <div class="flex flex-col md:flex-row gap-1 text-sm">
        <div>{{ auth.user.orgName }}</div>
        <div>{{ auth.user.departmentName }}</div>
      </div>
    </div>

    <!-- Menu List -->
    <div class="flex flex-col mt-10 font-bold pl-4 gap-2.5">
      <MenuLink link="/" name="หน้าหลัก" />
      <MenuLink link="/request/registration-success" name="ขึ้นทะเบียนสำเร็จ" />
      <MenuLink link="/user-management" name="User Management" />
    </div>
    <div class="flex flex-col gap-1 pl-8 font-semibold text-sm mt-auto">
      <RouterLink to="#">
        <div>บริการอื่นๆ</div>
      </RouterLink>
      <RouterLink to="#">
        <div>คำถามที่พบบ่อย</div>
      </RouterLink>
      <RouterLink to="/logout" class="font-bold text-base mt-2.5">
        <div>ออกจากระบบ</div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import authStore from '../@Stores/authStore';
import MenuLink from './MenuLink.vue';

const auth = authStore.useAuthStore();
</script>

<style scoped></style>
