import React from 'react'

function Footer() {
	return (
		<footer>
			<div className='container'>
				<p>© 2023 Lost and Found</p>
				<p>Coded by <a href='https://zambobence.dev' alt='personal portfolio page' target='_blank' rel="noreferrer" className='accent'>Bence Zambo</a></p>
				<div className='social'>
				<a href='https://www.github.com/zambobence' alt='github page' target='_blank' rel="noreferrer"><i class="fa-brands fa-github"></i></a>
				<a href='https://www.linkedin.com/in/bence-zambo-4b3b76153/' alt='linkedin page' target='_blank' rel="noreferrer"><i class="fa-brands fa-linkedin"></i></a>
				</div>
			</div>
		</footer>
	)
}

export default Footer
