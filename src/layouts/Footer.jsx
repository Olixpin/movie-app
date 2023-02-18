import React from 'react'

const Footer = () => {
  return (
    <footer className="footer p-8 bg-[#19191b22]">
      <div className="max-w-[1378px] mx-auto">
        <div className="flex justify-between items-center max-[425px]:flex-col max-[425px]:items-start gap-4">
          <div className="footer-left">
            <h1 className="text-2xl font-bold">Movie App</h1>
            <p className="text-sm">
              © {new Date().getFullYear()} Movie App. All rights reserved.
            </p>
          </div>
          <div className="footer-right">
            <p className="text-sm">
              Made with ❤️ by{' '}
              <a href="#" className="text-blue-500">
                Olix
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
