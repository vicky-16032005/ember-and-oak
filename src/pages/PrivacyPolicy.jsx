import LegalShell from './LegalShell.jsx'

export default function PrivacyPolicy() {
  return (
    <LegalShell title="Privacy policy">
      <p>
        This is a demonstration website. No personal data is collected, stored, or shared.
        The reservation form does not transmit anything to a server.
      </p>
      <h2>What we would collect</h2>
      <p>
        On a production version of this site, reservation requests would include your name,
        contact details, party size, and requested date, used only to confirm your booking.
      </p>
      <h2>Cookies</h2>
      <p>This demo sets no cookies and uses no analytics.</p>
      <h2>Contact</h2>
      <p>Questions about this policy can be sent to hello@emberandoak.example.</p>
    </LegalShell>
  )
}
