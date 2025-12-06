import Logo from "../Logo";
import Link from "next/link";
import {Facebook} from 'lucide-react'
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border py-5" id="footer">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <Logo variant="gradient"/>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transform ideas into beautiful mobile UIs with AI-powered generation.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link scroll={true} href={`/#features`}  className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link scroll={true} href={`/#pricing`} className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link scroll={true} href={`/#examples`} className="hover:text-primary transition-colors">Examples</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        {/*Socials*/}
        <div>
          <h4 className="font-semibold mb-4">Social</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="https://web.facebook.com/uisora" target="_blank" className="hover:text-primary transition-colors"><Facebook/></a></li>
            <li><a href="https://x.com/uisora_com" target="_blank" className="hover:text-primary transition-colors"><FaXTwitter/></a></li>
            <li><a href="https://www.instagram.com/uisora_com" target="_blank" className="hover:text-primary transition-colors"><FaInstagram/></a></li>
            <li><a href="https://www.tiktok.com/@uisora_com" target="_blank" className="hover:text-primary transition-colors"><FaTiktok/></a></li>
          </ul>
        </div>
      </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 UISora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
