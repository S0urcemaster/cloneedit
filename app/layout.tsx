import { fonts, FONT_FUNNEL_SANS } from "../static/constants"

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={fonts[FONT_FUNNEL_SANS].font.className}>
			<body>
				<div className='layout'>
					{children}
				</div>
			</body>
		</html>
	)
}