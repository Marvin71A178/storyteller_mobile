import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  story: [
    {
      id: "",
      title: "",
      subtitle: "",
      content: "",
    },
  ]
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   createStory: (state, action) => {
      // 添加一个新故事
      state.story.push(action.payload);
    },
    deleteStory: (state, action) => {
      // 删除一个特定的故事
      state.story = state.story.filter(story => story.id !== action.payload);
    }
  },
})



export const { createStory } = counterSlice.actions

export default counterSlice.reducer