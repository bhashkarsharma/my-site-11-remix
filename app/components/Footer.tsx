import { tw } from 'brise';
import React from 'react';
import { FaEnvelope, FaGithub, FaInstagram, FaMastodon, FaTwitter } from 'react-icons/fa';
import { SITE } from '~/constants/global';

const LINKS = {
    github: 'https://github.com/bhashkarsharma',
    instagram: 'https://instagram.com/play.pixels',
    twitter: 'https://twitter.com/bhashkarsharma',
    mastodon: 'https://fosstodon.org/@bsharma',
    email: 'mailto:info@bhashkar.me',
};

const FooterWrapper = tw.footer`
  p-8
  pb-2
  footer
  bg-secondary
  footer-center
`;

const iconSize = '2.5em';

function FooterLink({ href, children }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a href={href} target="_blank" rel="noreferrer">
            {children}
        </a>
    );
}

export default function Footer() {
    return (
        <FooterWrapper>
            <div className="grid grid-cols-5 gap-6">
                <FooterLink href={LINKS.github}>
                    <FaGithub size={iconSize} />
                </FooterLink>
                <FooterLink href={LINKS.mastodon}>
                    <FaMastodon size={iconSize} />
                </FooterLink>
                <FooterLink href={LINKS.twitter}>
                    <FaTwitter size={iconSize} />
                </FooterLink>
                <FooterLink href={LINKS.instagram}>
                    <FaInstagram size={iconSize} />
                </FooterLink>
                <FooterLink href={LINKS.email}>
                    <FaEnvelope size={iconSize} />
                </FooterLink>
            </div>
            <p>Copyright &copy; 2022 {SITE.title}</p>
        </FooterWrapper>
    );
}
