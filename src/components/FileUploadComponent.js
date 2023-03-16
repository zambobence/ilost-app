import React from 'react'

function FileUploadComponent({file, setFile, imgUrl, handleDeleteImg}) {
  return (
    <div className='addui-img-container'>
					{file ? (
						<>
							<img className='addui-img-preview' alt='preview' src={imgUrl} />
							<div className='delete-icon-overlay'>
								<i
									className='deleteIcon fa-solid fa-trash'
									onClick={handleDeleteImg}
								></i>
							</div>
						</>
					    ) : (
                        <>
                            <label htmlFor='fileInput' className='upload-icon'>
                                <i className='fa-solid fa-upload'></i>
                            </label>
                            <input
                                id='fileInput'
                                type='file'
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                    </>
					)}
				</div>
  )
}

export default FileUploadComponent