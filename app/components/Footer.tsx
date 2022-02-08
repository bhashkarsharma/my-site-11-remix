import { tw } from 'brise';
import { FaGithub } from 'react-icons/fa';

const LINKS = {
    github: 'https://github.com/bhashkarsharma',
};

const FooterWrapper = tw.footer`
  p-8
  pb-2
  footer
  bg-primary
  text-primary-content
  footer-center
`;

export default function Footer() {
    return (
        <FooterWrapper>
            <a href={LINKS.github}>
                <FaGithub size="3em" />
            </a>
            <p>Copyright &copy; 2022 Bhashkar Sharma</p>
        </FooterWrapper>
    );
}
