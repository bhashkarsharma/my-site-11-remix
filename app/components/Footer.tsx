import { tw } from 'brise';

const FooterWrapper = tw.footer`
  p-10
  footer
  bg-primary
  text-primary-content
  footer-center
`;

export default function Footer() {
    return (
        <FooterWrapper>
            <p>Copyright &copy; 2022 Bhashkar Sharma</p>
        </FooterWrapper>
    );
}
