import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #f2f2f2;
  padding: 20px;
  text-align: center;
`;

const FooterLink = styled.a`
  color: #333;
  text-decoration: none;
  margin: 0 8px;
  transition: color 0.3s ease;

  &:hover {
    color: #4285f4;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>
        Connect with me:
        <FooterLink href="https://github.com/arjunprakash027" target="_blank" rel="noopener noreferrer">
          GitHub
        </FooterLink>
        <FooterLink href="https://www.linkedin.com/in/arjunprakash027/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </FooterLink>
        <FooterLink href="mailto:your-email@arjunprakash027@gmail.com">
          Email
        </FooterLink>
      </p>
    </StyledFooter>
  );
};

export default Footer;
