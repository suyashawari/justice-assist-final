import React from "react";
import "./CyberBlogs.css"; 

const blogsData = [
  {
    id: 1,
    title: "How to Identify Online Scams",
    image: "/images/scam.jpg",
    sections: [
      {
        heading: "Introduction",
        content: `
Online scams are becoming more sophisticated every day, targeting individuals and businesses alike. Cybercriminals are constantly devising new ways to trick people into revealing sensitive information, such as login credentials, bank details, or personal data. These scams can appear in many forms, including emails, messages, phone calls, fake websites, social media links, or even seemingly legitimate apps.

Scammers often exploit human emotions like fear, curiosity, urgency, or greed to manipulate victims. For example, you might receive a message claiming that your bank account has been compromised or that you have won a lottery prize. The messages are designed to create panic or excitement, prompting you to act quickly without verifying the source.

It is important to stay vigilant and develop a habit of double-checking any suspicious communication. Look for warning signs such as poor grammar, generic greetings, unexpected attachments, or unfamiliar URLs. Being aware of common tactics used by scammers can help you avoid falling victim to online fraud.
        `
      },
      {
        heading: "Tips to Stay Safe",
        content: `Here are some practical measures to protect yourself from online scams and cyber threats:`,
        list: [
          "Always verify the sender’s email address or phone number before responding. Official organizations rarely ask for sensitive information through email or text.",
          "Avoid clicking on links or downloading attachments from unknown or suspicious sources. Even if the message looks legitimate, double-check the URL by typing it manually in your browser.",
          "Enable two-factor authentication (2FA) on all your accounts. This adds an extra layer of security, making it harder for attackers to gain access even if they have your password.",
          "Keep your devices, operating systems, and apps updated. Many scams exploit outdated software vulnerabilities to gain unauthorized access.",
          "Use strong, unique passwords for every account and consider using a reputable password manager to store them securely.",
          "Educate yourself and your family about common scam tactics. Awareness is often the most effective defense against cybercrime.",
          "Report suspicious activity to your bank, service provider, or the relevant cybercrime authorities in your country."
        ]
      }
    ]
  },

  {
    id: 2,
    title: "Best Practices for Strong Passwords",
    image: "/images/blog2.jpeg",
    sections: [
      {
        heading: "Introduction",
        content: `
Passwords are the first and most important line of defense for protecting your online accounts. Weak or reused passwords make it easy for attackers to gain unauthorized access to your personal data, bank accounts, emails, or social media profiles. Cybercriminals often use automated tools to guess common passwords, so even seemingly harmless accounts can be vulnerable.
        `
      },
      {
        heading: "Creating Strong Passwords",
        content: `
Creating a strong password involves using a combination of letters, numbers, and symbols. A good password should be at least 12 characters long and include uppercase, lowercase, numbers, and special characters like @, #, $, or !. Avoid using common words, phrases, or easily guessable information such as birthdays or pet names.
        `,
        list: [
          "Use a mix of uppercase, lowercase, numbers, and symbols.",
          "Avoid common words, phrases, or easily guessable personal info.",
          "Consider random password strings like 'G7m$kP9v!wQe' for maximum security."
        ]
      },
      {
        heading: "Password Management",
        content: `
Managing multiple complex passwords can be challenging. This is where a password manager becomes essential. A password manager securely stores all your passwords in an encrypted vault and can even generate strong random passwords for you. This way, you only need to remember one master password, while all other credentials remain safe and unique.
        `,
        list: [
          "Avoid using the same password across multiple accounts.",
          "Change passwords periodically, especially for sensitive accounts.",
          "Enable two-factor authentication (2FA) wherever possible.",
          "Never share your passwords with anyone, even trusted friends or colleagues."
        ]
      }
    ]
  },

  {
    id: 3,
    title: "How Hackers Trick Users Online",
    image: "/images/blog3.jpg",
    sections: [
      {
        heading: "Introduction",
        content: `
Hackers use various tactics to steal personal information, compromise accounts, and commit fraud. Common attacks include phishing emails, fake websites, social engineering, and malicious links shared on social media. These attacks exploit human psychology, leveraging fear, urgency, or curiosity to trick users.
        `
      },
      {
        heading: "Common Tricks",
        content: `
Some common methods hackers use include phishing emails disguised as official messages, fake login pages mimicking trusted websites, and phone calls pretending to be support agents. These methods aim to steal sensitive information like passwords, credit card numbers, or personal identification.
        `,
        list: [
          "Phishing emails that appear to be from legitimate sources.",
          "Fake websites that replicate trusted platforms.",
          "Social engineering via phone calls or chat messages."
        ]
      },
      {
        heading: "Prevention Tips",
        content: `
To protect yourself, always verify the source of any communication before responding. Use strong, unique passwords and enable two-factor authentication (2FA) on your accounts. Keep your software and devices updated, and avoid clicking suspicious links or downloading unknown attachments.
        `,
        list: [
          "Verify email addresses and URLs carefully.",
          "Enable two-factor authentication (2FA) for extra security.",
          "Keep devices and software updated to patch vulnerabilities.",
          "Educate yourself about common hacking tactics."
        ]
      }
    ]
  },

  {
    id: 4,
    title: "Protecting Your Privacy Online",
    image: "/images/blog4.jpg",
    sections: [
      {
        heading: "Introduction",
        content: `
Your personal information is valuable and can be exploited by cybercriminals for identity theft, fraud, or targeted advertising. Protecting your privacy ensures your data stays secure and under your control.
        `
      },
      {
        heading: "Why Privacy Matters",
        content: `
Cybercriminals and even some companies collect personal data to exploit it for financial gain. By understanding the importance of privacy, you can take proactive steps to protect your digital footprint.
        `
      },
      {
        heading: "Practical Tips",
        content: `
Here are steps you can take to maintain your privacy online:
        `,
        list: [
          "Use strong, unique passwords for all accounts.",
          "Avoid oversharing personal information on social media.",
          "Regularly review privacy settings on apps and websites.",
          "Be cautious about granting access permissions to apps or services.",
          "Enable two-factor authentication (2FA) wherever possible."
        ]
      }
    ]
  }
];

const CyberBlogs = () => {
  return (
    <div className="cyberblogs-container">
      <h2 className="cyberblogs-title">Cyber Awareness Blog</h2>
      <p className="cyberblogs-intro">
        Read the latest articles about online safety, scams, and cybersecurity. Stay informed and protect yourself online.
      </p>

      {blogsData.map((blog) => (
        <article key={blog.id} className="cyberblog-article">
          <h3 className="cyberblog-heading">{blog.title}</h3>
          <img
            src={blog.image}
            alt={blog.title}
            className="cyberblog-image"
          />

          {blog.sections.map((section, idx) => (
            <div key={idx} className="cyberblog-section">
              {section.image && (
                <img
                  src={section.image}
                  alt={section.heading}
                  className="cyberblog-section-image"
                />
              )}
              <h4 className="cyberblog-subheading">{section.heading}</h4>
              <p className="cyberblog-content">{section.content}</p>

              {section.list && (
                <ul className="cyberblog-list">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <hr className="cyberblog-divider" />
        </article>
      ))}
    </div>
  );
};

export default CyberBlogs;
