import FooterLink from "./FooterLink";
import Container from "react-bootstrap/Container";

import classes from "./Footer.module.css"

const Footer = () => {
  return (
    <footer>
      <Container>

        <h5>Questions? Call <a href="tel:0808 196 5391">0808 196 5391</a></h5>
        <ul>
          {FOOTER_LINKS.map(link => <FooterLink key={link.id} name={link.name} url={link.url} />)}
        </ul>
      </Container>
    </footer>
  );
}

export default Footer;

const FOOTER_LINKS = [
  { id: 1, name: "FAQ", url: "/faq" },
  { id: 2, name: "Help Centre", url: "/help-center" },
  { id: 3, name: "Account", url: "/account" },
  { id: 4, name: "Media Centre", url: "/media-center" },
  { id: 5, name: "Investor Relations", url: "/investor-relations" },
  { id: 6, name: "Jobs", url: "/jobs" },
  { id: 7, name: "Redeem gift cards", url: "/redeem-gift-cards" },
  { id: 8, name: "Buy gift cards", url: "/buy-gift-cards" },
  { id: 9, name: "Ways to Watch", url: "/ways-to-watch" },
  { id: 10, name: "Terms of Use", url: "/terms-of-use" },
  { id: 11, name: "Privacy", url: "/privacy" },
  { id: 12, name: "Cookie Preferences", url: "/cookie-preferences" },
  { id: 13, name: "Corporate Information", url: "/corporate-information" },
  { id: 14, name: "Contact Us", url: "/contact-us" },
  { id: 15, name: "Speed Test", url: "/speed-test" },
  { id: 16, name: "Legal Guarantee", url: "/legal-guarantee" },
  { id: 17, name: "Legal Notices", url: "/legal-notices" },
  { id: 18, name: "Only on Netflix", url: "/only-on-netflix" },
]
