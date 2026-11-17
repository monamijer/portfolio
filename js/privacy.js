/**
 * privacy.js
 * Privacy notice view (route: #/privacy). Texts live in i18n.js.
 */

export const privacyView = () => /* html */ `
  <div class="container page privacy-page">
    <div class="reveal">
      <h1 data-i18n="privacy.title">Privacy notice</h1>
      <p data-i18n="privacy.intro">This site is a personal portfolio. It collects only the data described below.</p>
    </div>

    <section class="reveal">
      <h2 data-i18n="privacy.newsletterTitle">Newsletter</h2>
      <p data-i18n="privacy.newsletterText">If you subscribe, your email address is stored by Brevo, my email service provider based in France, only to send you the newsletter. Your consent is the legal basis. I never sell or share your address.</p>
    </section>

    <section class="reveal">
      <h2 data-i18n="privacy.contactTitle">Contact form</h2>
      <p data-i18n="privacy.contactText">Messages sent through the contact form are delivered to me by FormSubmit and used only to reply to you.</p>
    </section>

    <section class="reveal">
      <h2 data-i18n="privacy.storageTitle">Local data</h2>
      <p data-i18n="privacy.storageText">Your theme, language and reading-mode choices are saved in your browser only. No analytics or advertising cookies are used. Fonts and icons are loaded from Google Fonts and jsDelivr.</p>
    </section>

    <section class="reveal">
      <h2 data-i18n="privacy.rightsTitle">Your rights</h2>
      <p data-i18n="privacy.rightsText">You can unsubscribe with the link in every email, and ask me to access or delete your data at any time by writing to the address on the Contact page.</p>
    </section>

    <a class="btn btn-outline" href="#/">
      <i class="bi bi-house"></i> <span data-i18n="privacy.back">Back to home</span>
    </a>
  </div>
`;
