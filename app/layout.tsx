import * as constants from './constants'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={constants.fonts[constants.FONT_FUNNEL_SANS].font.className}>
			<body>
				<div className='layout'>
					{children}
				</div>
			</body>
		</html>
	)
}