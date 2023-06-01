import { ref } from 'vue';

const userId = ref('');
const notification = ref({
  success: true,
  message: 'Test',
  notificate: true
});

export default { userId, notification };