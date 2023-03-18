import React from 'react'

function TitleCommentComponent({title, setTitle, comment, setComment}) {
  return (
    <>
    <div className='input-cont'>
      <label htmlFor='title'>Title</label>
      
      <input
          name='title'
          className='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          maxLength='30'
      />

      </div>
      <label htmlFor='comment'>Comment</label>
      <textarea
          name='comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Any remark'
      />
    </>
  )
}

export default TitleCommentComponent