<template>
  <v-container class="py-6">
    <v-card class="pa-6" max-width="800" elevation="3">
      <!-- Flex 컨테이너, justify-space-between으로 좌우 정렬 -->
      <v-card-title class="d-flex align-center justify-space-between">
        <span class="text-h5 font-weight-bold">Qna글 작성</span>

        <!-- 또는 justify-space-between 대신 아래와 같이만 해도 됩니다 -->
        <!-- <v-radio-group v-model="form.visibility" row class="ml-auto"> -->
        <v-radio-group
          v-model="form.visibility"
          row
        >
          <v-radio label="공개" value="PUBLIC" />
          <v-radio label="비공개" value="PRIVATE" />
        </v-radio-group>
      </v-card-title>

      <v-text-field
        label="제목"
        v-model="form.title"
        outlined
        dense
        class="mt-4"
      />

      <v-textarea
        label="내용"
        v-model="form.content"
        rows="10"
        outlined
        class="mt-4"
      />

      <v-btn
        color="primary"
        class="mt-4"
        :loading="loading"
        @click="submitPost"
      >
        등록
      </v-btn>
    </v-card>
  </v-container>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuth } from '@/hooks/useAuth'

const router = useRouter()
const toast = useToast()
const auth = useAuth()

const loading = ref(false)

// boardType 대신 visibility 필드 추가
const form = reactive({
  title: '',
  content: '',
  boardType: 'qna',
  visibility: 'PUBLIC'  // 기본값을 공개로 설정
})

const submitPost = async () => {
  if (!form.title || !form.content) {
    toast.warning('제목과 내용을 모두 입력해주세요.')
    return
  }

  loading.value = true

  try {
    await axios.post('/api/v1/board', {
      title: form.title,
      content: form.content,
      boardType: form.boardType,
      visibility: form.visibility  // 여기로 PUBLIC 또는 PRIVATE 전송
    })

    toast.success('Qna글이 등록되었습니다.')
    router.push('/qna')
  } catch (error) {
    toast.error('등록에 실패했습니다.')
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 아래 클래스들은 필요에 따라 조정하세요 */
.ml-6 { margin-left: 24px; }
</style>
