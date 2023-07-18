export interface FAQItem {
  q: string;
  a: string;
}

export const FAQContent: FAQItem[] = [
  { q: "Why credentials?", a: `<p>The Web3 is all about communities, and credentials are becoming an essential building block for them, because:
 </br>
 </br>
  <li>Serve as both a social and professional "signal" in the Web3 space, as evidenced by the growing popularity of POAP badges and other NFTs used to show wealth or belonging.</li>
  Promote participation & engagement within the community and outside of it.</li>
  <li> Act as rewards for prominent members, showing appreciation for their work.</li>
  <li> Can be used as roles in apps and other selected activities.</li>
  
  </br>
  </br>
  <strong>In conclusion, credentials level up the power of the community !</strong></p>` },
  { q: "What is social capital?", a: `With the growing importance of credentials in Web3 communities as both a social and professional "signal" (as demonstrated by the popularity of POAPs and other NFTs used to show wealth or belonging), it's crucial to have a streamlined, trusted and reliable system for validating claims. <br> <br> As the Web3 ecosystem continues to expand, the importance of credentials as a means of establishing social status and verifying professional qualifications will only increase, creating a huge market for all credential protocols. ` },
  { q: "What types of claims and credentials will we validate and issue?", a: `We will first focus on public credentials which are of particular value to a given Web3 community, that can be validated and issued by the said community without any legal or governmental interference or issues.<br><br>
  A typical case would be a “Best contributor for zkIgnite Cohort 1 2023” credential, which may be of significance to this particular community, but has no other legal implications or liabilities.` },
  { q: "Why only public credentials ?", a: `People wants to show their credentials to the community (and to the world) as a proof of membership, participation, engagement, skills, etc. So no credential privacy is required here as both which applicant owns a credential and which credentials she owns will be public info. <br><br>
  We will leave other types of credentials (such as academic or professional certifications) which may have a wide set of legal implications and liabilities to a later phase of the protocol, even though we consider that (on the technical side) it will be rather straightforward by an admin to set an usable master plan for this type of claims.` },
];
