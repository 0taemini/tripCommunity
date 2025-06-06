// src/components/board/boardService.ts
import axios from 'axios'

export interface Board {
  bno: number
  title: string
  mno: number
  content: string
  author: string
  createdDate: string
  views: number
  visibility: 'PUBLIC' | 'PRIVATE'
  imageUrls: []
}

export enum PostVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE', 
}

export interface BoardPost {
  bno: number
  mno: number
  title: string
  content: string
  author: string
  createdDate: string
  views?: number
  likes?: number
  imageUrls?: string[]
}

export interface PostNavigation {
  prev?: { bno: number; title: string }
  next?: { bno: number; title: string }
}

// 인기글 5개 조회 (기존)
export async function fetchPopularBoards(
  boardType: 'board' | 'notice' | 'qna'
): Promise<Board[]> {
  const res = await axios.get<Board[]>(
    `/api/v1/board/views/${encodeURIComponent(boardType)}`
  )
  return res.data
}

/**
 * 게시글 이미지 업로드
 * @param bno  게시글 번호
 * @param file 첨부할 이미지 파일
 * @returns     업로드된 이미지의 imgNo
 */
export async function uploadBoardImage(
  bno: number,
  file: File
): Promise<number> {
  const form = new FormData()
  form.append('file', file)
  const res = await axios.post<{ imgNo: number }>(
    `/api/v1/board/${bno}/images`,
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
  return res.data.imgNo
}
