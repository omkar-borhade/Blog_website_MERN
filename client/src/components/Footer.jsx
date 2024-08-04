import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsInstagram, BsWhatsapp } from 'react-icons/bs';

function FooterCom() {
  return (
    <Footer container className="border-t-8 border-lime-600 bg-white">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="whitespace-nowrap text-lg sm:text-xl font-semibold bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700 rounded-lg text-white px-2 py-2"
            >
              Info Blogs
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.google.com"
                  target="blank"
                  rel="noopener noreferrer"
                  className="text-lime-600 hover:text-lime-800"
                >
                  Google
                </Footer.Link>

                <Footer.Link
                  href="https://www.youtube.com"
                  target="blank"
                  rel="noopener noreferrer"
                  className="text-lime-600 hover:text-lime-800"
                >
                  Youtube
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                  target="blank"
                  rel="noopener noreferrer"
                  className="text-lime-600 hover:text-lime-800"
                >
                  Git Hub
                </Footer.Link>

                <Footer.Link
                  href="#"
                  target="blank"
                  rel="noopener noreferrer"
                  className="text-lime-600 hover:text-lime-800"
                >
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                  target="blank"
                  rel="noopener noreferrer"
                  className="text-lime-600 hover:text-lime-800"
                >
                  Privacy Policy
                </Footer.Link>

                <Footer.Link
                  href="#"
                  target="blank"
                  rel="noopener noreferrer"
                  className="text-lime-600 hover:text-lime-800"
                >
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="border-lime-600" />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Info Blogs"
            year={new Date().getFullYear()}
            className="text-lime-600"
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} className="text-lime-600 hover:text-lime-800" />
            <Footer.Icon href="#" icon={BsInstagram} className="text-lime-600 hover:text-lime-800" />
            <Footer.Icon href="#" icon={BsGithub} className="text-lime-600 hover:text-lime-800" />
            <Footer.Icon href="#" icon={BsWhatsapp} className="text-lime-600 hover:text-lime-800" />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterCom;
