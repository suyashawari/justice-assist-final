import React, { useState } from "react";
import "./CyberLaws.css";

const CyberLaws = () => {
  const [lang, setLang] = useState("en"); // default English

  <div className="lang-switcher">
  <button 
    className={lang === "en" ? "active" : ""} 
    onClick={() => setLang("en")}
  >
    English
  </button>
  <button 
    className={lang === "hi" ? "active" : ""} 
    onClick={() => setLang("hi")}
  >
    हिंदी
  </button>
  <button 
    className={lang === "mr" ? "active" : ""} 
    onClick={() => setLang("mr")}
  >
    मराठी
  </button>
</div>


  const laws = {
    "IT Act, 2000": [
      {
        name: {
          en: "Hacking with Computer Systems",
          hi: "कंप्यूटर सिस्टम्स के साथ हैकिंग",
          mr: "संगणक प्रणालीसह हॅकिंग"
        },
        section: {
          en: "Section 66 – IT Act",
          hi: "अनुभाग 66 – आईटी अधिनियम",
          mr: "कलम 66 – IT कायदा"
        },
        description: {
          en: "This section deals with unauthorized access to computer systems, hacking, and tampering with data or networks. Penalties include fines and imprisonment.",
          hi: "यह अनुभाग अनधिकृत पहुँच, हैकिंग और डेटा या नेटवर्क में छेड़छाड़ से संबंधित है। दंड में जुर्माना और जेल शामिल हैं।",
          mr: "हा कलम अनधिकृत प्रवेश, हॅकिंग आणि डेटा किंवा नेटवर्कमध्ये हस्तक्षेप यासंबंधी आहे. शिक्षा मध्ये दंड आणि तुरुंग आहेत."
        },
        preventiveMeasures: {
          en: [
            "Use strong, unique passwords for all accounts",
            "Enable multi-factor authentication",
            "Regularly update software and security patches",
            "Avoid clicking on suspicious links or downloading untrusted files",
            "Report breaches immediately to authorities"
          ],
          hi: [
            "सभी खातों के लिए मजबूत, अद्वितीय पासवर्ड का उपयोग करें",
            "मल्टी-फैक्टर प्रमाणीकरण सक्षम करें",
            "सॉफ्टवेयर और सुरक्षा पैच को नियमित रूप से अपडेट करें",
            "संदिग्ध लिंक पर क्लिक करने या अविश्वसनीय फ़ाइलें डाउनलोड करने से बचें",
            "घटनाओं की तुरंत रिपोर्ट करें"
          ],
          mr: [
            "सर्व खात्यांसाठी मजबूत, अद्वितीय पासवर्ड वापरा",
            "मल्टी-फॅक्टर प्रमाणीकरण सक्षम करा",
            "सॉफ्टवेअर आणि सुरक्षा पॅच नियमितपणे अपडेट करा",
            "शंका असलेले लिंक क्लिक करू नका किंवा अविश्वसनीय फायली डाउनलोड करू नका",
            "घटना त्वरित अधिकाऱ्यांना कळवा"
          ]
        },
        example: {
          en: "Example: Breaking into someone’s social media account without authorization.",
          hi: "उदाहरण: किसी के सोशल मीडिया खाते में अनधिकृत प्रवेश।",
          mr: "उदाहरण: एखाद्याच्या सोशल मीडिया खात्यात अनधिकृत प्रवेश."
        }
      },
      // You can add more IT Act laws here following same structure
        {
          name: {
            en: "Identity Theft",
            hi: "पहचान की चोरी",
            mr: "ओळखीची चोरी"
          },
          section: {
            en: "Section 66C – IT Act",
            hi: "अनुभाग 66C – आईटी अधिनियम",
            mr: "कलम 66C – IT Act"
          },
          description: {
            en: "Criminalizes misuse of another person’s digital identity, including passwords, digital signatures, or biometric data. Protects individuals from fraud, impersonation, and unauthorized transactions.",
            hi: "किसी अन्य व्यक्ति की डिजिटल पहचान का दुरुपयोग, जैसे पासवर्ड, डिजिटल हस्ताक्षर या बायोमेट्रिक डेटा, दंडनीय है। यह धोखाधड़ी, पहचान की चोरी और अनधिकृत लेनदेन से सुरक्षा करता है।",
            mr: "इतर व्यक्तीची डिजिटल ओळख, जसे की पासवर्ड, डिजिटल स्वाक्षरी किंवा बायोमेट्रिक डेटा, चुकीसाठी वापरणे गुन्हा आहे. हे फसवणूक, ओळख चोरी आणि अनधिकृत व्यवहारापासून संरक्षण करते."
          },
          preventiveMeasures: {
            en: [
              "Never share your passwords or OTPs",
              "Use secure channels for sharing sensitive information",
              "Monitor financial and online accounts regularly",
              "Report stolen identity usage immediately"
            ],
            hi: [
              "कभी भी अपने पासवर्ड या OTP साझा न करें",
              "संवेदनशील जानकारी साझा करने के लिए सुरक्षित चैनल का उपयोग करें",
              "वित्तीय और ऑनलाइन खातों की नियमित निगरानी करें",
              "चोरी गई पहचान के उपयोग की तुरंत रिपोर्ट करें"
            ],
            mr: [
              "कधीही तुमचे पासवर्ड किंवा OTP शेअर करू नका",
              "संवेदनशील माहिती शेअर करण्यासाठी सुरक्षित चॅनेल वापरा",
              "आर्थिक आणि ऑनलाइन खात्यांचे नियमित निरीक्षण करा",
              "चोरी झालेल्या ओळखीचा वापर ताबडतोब रिपोर्ट करा"
            ]
          },
          example: {
            en: "Example: Using someone else’s Aadhaar or PAN card details to open a bank account.",
            hi: "उदाहरण: बैंक खाता खोलने के लिए किसी अन्य व्यक्ति के आधार या पैन कार्ड विवरण का उपयोग।",
            mr: "उदाहरण: बँक खाते उघडण्यासाठी इतर व्यक्तीचा आधार किंवा PAN कार्ड तपशील वापरणे."
          }
        },
        {
          name: {
            en: "Violation of Privacy",
            hi: "गोपनीयता का उल्लंघन",
            mr: "गोपनीयतेचे उल्लंघन"
          },
          section: {
            en: "Section 66E – IT Act",
            hi: "अनुभाग 66E – आईटी अधिनियम",
            mr: "कलम 66E – IT Act"
          },
          description: {
            en: "Capturing, publishing, or transmitting private images of individuals without consent is illegal. This protects personal dignity and privacy in digital spaces.",
            hi: "व्यक्तियों की निजी छवियों को बिना अनुमति के कैप्चर, प्रकाशित या प्रेषित करना अवैध है। यह डिजिटल स्थानों में व्यक्तिगत गरिमा और गोपनीयता की सुरक्षा करता है।",
            mr: "व्यक्तींच्या खाजगी प्रतिमा परवानगीशिवाय कॅप्चर करणे, प्रकाशित करणे किंवा पाठवणे बेकायदेशीर आहे. हे डिजिटल जागेत वैयक्तिक प्रतिष्ठा आणि गोपनीयता संरक्षित करते."
          },
          preventiveMeasures: {
            en: [
              "Do not take or share photos/videos without consent",
              "Secure your devices with passwords or encryption",
              "Be cautious with social media privacy settings"
            ],
            hi: [
              "बिना अनुमति के फोटो/वीडियो न लें या साझा न करें",
              "अपने डिवाइस को पासवर्ड या एन्क्रिप्शन के साथ सुरक्षित करें",
              "सोशल मीडिया गोपनीयता सेटिंग्स में सावधान रहें"
            ],
            mr: [
              "परवानगीशिवाय फोटो/व्हिडिओ घेऊ किंवा शेअर करू नका",
              "तुमच्या डिव्हाइसला पासवर्ड किंवा एन्क्रिप्शनसह सुरक्षित ठेवा",
              "सोशल मीडिया गोपनीयता सेटिंग्जमध्ये सावध रहा"
            ]
          },
          example: {
            en: "Example: Sharing private photos of someone on WhatsApp groups without permission.",
            hi: "उदाहरण: बिना अनुमति के किसी के निजी फोटो को व्हाट्सएप समूहों में साझा करना।",
            mr: "उदाहरण: परवानगीशिवाय एखाद्याचे खाजगी फोटो WhatsApp गटात शेअर करणे."
          }
        },
        {
          name: {
            en: "Publishing Obscene Material",
            hi: "अश्लील सामग्री प्रकाशित करना",
            mr: "अश्लील सामग्री प्रकाशित करणे"
          },
          section: {
            en: "Section 67 – IT Act",
            hi: "अनुभाग 67 – आईटी अधिनियम",
            mr: "कलम 67 – IT Act"
          },
          description: {
            en: "Prohibits publishing or transmitting obscene content electronically, preventing distribution of pornographic or offensive material online.",
            hi: "इलेक्ट्रॉनिक रूप से अश्लील सामग्री प्रकाशित या प्रसारित करना निषिद्ध है, जो ऑनलाइन पोर्नोग्राफिक या अपमानजनक सामग्री के वितरण को रोकता है।",
            mr: "इलेक्ट्रॉनिक पद्धतीने अश्लील सामग्री प्रकाशित किंवा प्रसारित करणे बंद आहे, जे ऑनलाइन पोर्नोग्राफिक किंवा अपमानकारक सामग्रीचे वितरण थांबवते."
          },
          preventiveMeasures: {
            en: [
              "Avoid uploading or sharing explicit content",
              "Report illegal content to authorities",
              "Use parental controls and filters if needed"
            ],
            hi: [
              "स्पष्ट सामग्री अपलोड या साझा करने से बचें",
              "अवैध सामग्री की रिपोर्टिंग अधिकारियों को करें",
              "यदि आवश्यक हो तो माता-पिता नियंत्रण और फ़िल्टर का उपयोग करें"
            ],
            mr: [
              "स्पष्ट सामग्री अपलोड किंवा शेअर करण्यापासून टाळा",
              "बेकायदेशीर सामग्री अधिकाऱ्यांना कळवा",
              "आवश्यक असल्यास पालक नियंत्रण आणि फिल्टर वापरा"
            ]
          },
          example: {
            en: "Example: Uploading pornographic material on public websites.",
            hi: "उदाहरण: सार्वजनिक वेबसाइटों पर पोर्नोग्राफिक सामग्री अपलोड करना।",
            mr: "उदाहरण: सार्वजनिक वेबसाइटवर पॉर्नोग्राफिक सामग्री अपलोड करणे."
          }
        },
        {
          name: {
            en: "Publishing Sexually Explicit Content",
            hi: "यौन स्पष्ट सामग्री प्रकाशित करना",
            mr: "लैंगिक स्पष्ट सामग्री प्रकाशित करणे"
          },
          section: {
            en: "Section 67A – IT Act",
            hi: "अनुभाग 67A – आईटी अधिनियम",
            mr: "कलम 67A – IT Act"
          },
          description: {
            en: "Specifically targets sexually explicit content transmitted electronically, including videos and images. Violators can face imprisonment and fines.",
            hi: "विशेष रूप से इलेक्ट्रॉनिक रूप से प्रसारित यौन स्पष्ट सामग्री को लक्षित करता है, जिसमें वीडियो और छवियां शामिल हैं। उल्लंघन करने वालों को जेल और जुर्माना हो सकता है।",
            mr: "विशेषतः इलेक्ट्रॉनिक पद्धतीने प्रसारित लैंगिक स्पष्ट सामग्रीवर लक्ष केंद्रित करते, ज्यात व्हिडिओ आणि प्रतिमा समाविष्ट आहेत. उल्लंघन करणाऱ्यांना तुरुंग आणि दंड भोगावा लागू शकतो."
          },
          preventiveMeasures: {
            en: [
              "Never share or distribute explicit material",
              "Check content legality before posting online"
            ],
            hi: [
              "कभी भी स्पष्ट सामग्री साझा या वितरित न करें",
              "ऑनलाइन पोस्ट करने से पहले सामग्री की वैधता जांचें"
            ],
            mr: [
              "कधीही स्पष्ट सामग्री शेअर किंवा वितरण करू नका",
              "ऑनलाइन पोस्ट करण्यापूर्वी सामग्री कायदेशीर आहे का तपासा"
            ]
          },
          example: {
            en: "Example: Sharing adult videos on websites or social media.",
            hi: "उदाहरण: वेबसाइट या सोशल मीडिया पर वयस्क वीडियो साझा करना।",
            mr: "उदाहरण: वेबसाइट किंवा सोशल मीडिया वर प्रौढ व्हिडिओ शेअर करणे."
          }
        },
        {
          name: {
            en: "Breach of Confidentiality",
            hi: "गोपनीयता का उल्लंघन",
            mr: "गोपनीयतेचे उल्लंघन"
          },
          section: {
            en: "Section 72 – IT Act",
            hi: "अनुभाग 72 – आईटी अधिनियम",
            mr: "कलम 72 – IT Act"
          },
          description: {
            en: "Disclosure of personal or confidential information without consent is prohibited. Covers employees, service providers, or anyone with access to sensitive data.",
            hi: "बिना अनुमति के व्यक्तिगत या गोपनीय जानकारी का खुलासा निषिद्ध है। इसमें कर्मचारी, सेवा प्रदाता या संवेदनशील डेटा तक पहुंच रखने वाला कोई भी शामिल है।",
            mr: "परवानगीशिवाय वैयक्तिक किंवा गोपनीय माहिती उघड करणे निषिद्ध आहे. यात कर्मचारी, सेवा प्रदाता किंवा संवेदनशील डेटापर्यंत पोहोच असलेला कोणताही व्यक्ती समाविष्ट आहे."
          },
          preventiveMeasures: {
            en: [
              "Handle sensitive data responsibly",
              "Avoid sharing others’ personal information",
              "Report leaks immediately"
            ],
            hi: [
              "संवेदनशील डेटा को जिम्मेदारी से संभालें",
              "दूसरों की व्यक्तिगत जानकारी साझा करने से बचें",
              "लीक्स की तुरंत रिपोर्टिंग करें"
            ],
            mr: [
              "संवेदनशील डेटाचे जबाबदारीने हाताळा",
              "इतरांच्या वैयक्तिक माहितीचे शेअरिंग टाळा",
              "लीक्स ताबडतोब रिपोर्ट करा"
            ]
          },
          example: {
            en: "Example: A telecom employee leaking customer call records.",
            hi: "उदाहरण: एक टेलीकॉम कर्मचारी ग्राहक कॉल रिकॉर्ड लीक करना।",
            mr: "उदाहरण: एका टेलिकॉम कर्मचाऱ्याने ग्राहक कॉल रेकॉर्ड लीक करणे."
          }
        }
            
    ],
    "IPC(Indian Penal Code)": [
      {
        name: {
          en: "Cheating by Personation",
          hi: "व्यक्ति का बहाना बनाकर धोखाधड़ी",
          mr: "वैयक्तिक बनवून फसवणूक"
        },
        section: {
          en: "Section 416 – IPC",
          hi: "अनुभाग 416 – आईपीसी",
          mr: "कलम 416 – IPC"
        },
        description: {
          en: "Impersonating someone online to cheat or defraud others is illegal. Protects users from identity-based frauds.",
          hi: "किसी के ऑनलाइन खाते का बहाना बनाकर धोखा देना अवैध है। यह उपयोगकर्ताओं को पहचान-आधारित धोखाधड़ी से बचाता है।",
          mr: "कोणीतरी ऑनलाइन खाती वापरून फसवणूक करणे बेकायदेशीर आहे. हे वापरकर्त्यांना ओळख-आधारित फसवणूक पासून संरक्षित करते."
        },
        preventiveMeasures: {
          en: [
            "Verify identity before financial transactions",
            "Do not trust unsolicited job offers or messages",
            "Report suspicious websites or calls"
          ],
          hi: [
            "वित्तीय लेनदेन से पहले पहचान सत्यापित करें",
            "अनचाहे नौकरी के ऑफ़र या संदेशों पर भरोसा न करें",
            "संदिग्ध वेबसाइटों या कॉल की रिपोर्ट करें"
          ],
          mr: [
            "वित्तीय व्यवहारापूर्वी ओळख सत्यापित करा",
            "अनवांछित नोकरीच्या ऑफर किंवा संदेशांवर विश्वास ठेवू नका",
            "शक्य वेबसाइट किंवा कॉलची तक्रार करा"
          ]
        },
        example: {
          en: "Example: Fake job websites collecting money from applicants.",
          hi: "उदाहरण: नकली नौकरी वेबसाइटों द्वारा आवेदकों से पैसे वसूल करना।",
          mr: "उदाहरण: बनावट नोकरी वेबसाइट्स अर्जदारांकडून पैसे गोळा करतात."
        }
      },
      // Add more IPC laws here
        {
          name: {
            en: "Forgery of Electronic Records",
            hi: "इलेक्ट्रॉनिक रिकॉर्ड्स की जालीकरण",
            mr: "इलेक्ट्रॉनिक नोंदींचे फसवे बनवणे"
          },
          section: {
            en: "Section 463 – IPC",
            hi: "अनुभाग 463 – आईपीसी",
            mr: "कलम 463 – IPC"
          },
          description: {
            en: "Making false electronic documents with intent to cause harm is punishable. Prevents creation and circulation of fake records digitally.",
            hi: "हानि पहुँचाने के उद्देश्य से झूठे इलेक्ट्रॉनिक दस्तावेज बनाना दंडनीय है। यह जाली रिकॉर्ड बनाने और फैलाने से रोकता है।",
            mr: "हानिकारक हेतूने खोटे इलेक्ट्रॉनिक दस्तऐवज तयार करणे दंडनीय आहे. हे फसवे नोंदी तयार आणि प्रसारित होण्यापासून प्रतिबंधित करते."
          },
          preventiveMeasures: {
            en: [
              "Always verify electronic documents",
              "Use digital signature verification tools",
              "Report forged documents to authorities"
            ],
            hi: [
              "हमेशा इलेक्ट्रॉनिक दस्तावेज़ सत्यापित करें",
              "डिजिटल सिग्नेचर सत्यापन उपकरणों का उपयोग करें",
              "जाली दस्तावेज़ अधिकारियों को रिपोर्ट करें"
            ],
            mr: [
              "नेहमी इलेक्ट्रॉनिक दस्तऐवज सत्यापित करा",
              "डिजिटल स्वाक्षरी सत्यापन साधने वापरा",
              "फसवे दस्तऐवज अधिकाऱ्यांना कळवा"
            ]
          },
          example: {
            en: "Example: Creating fake mark sheets online.",
            hi: "उदाहरण: ऑनलाइन नकली मार्कशीट बनाना।",
            mr: "उदाहरण: ऑनलाइन खोट्या मार्कशीट तयार करणे."
          }
        },
        {
          name: {
            en: "Forgery for Cheating",
            hi: "धोखाधड़ी के लिए जालीकरण",
            mr: "फसवणुकीसाठी फसवे बनवणे"
          },
          section: {
            en: "Section 468 – IPC",
            hi: "अनुभाग 468 – आईपीसी",
            mr: "कलम 468 – IPC"
          },
          description: {
            en: "Addresses forgery intended to cheat others. Fraudulent documents can include fake invoices, bank statements, or certificates.",
            hi: "यह उन जाली दस्तावेज़ों को रोकता है जो दूसरों को धोखा देने के लिए बनाए जाते हैं। इसमें नकली चालान, बैंक स्टेटमेंट या प्रमाणपत्र शामिल हो सकते हैं।",
            mr: "हे फसवे दस्तऐवज थांबवते जे इतरांना फसवण्यासाठी तयार केले जातात. यात खोटे चलाने, बँक स्टेटमेंट किंवा प्रमाणपत्रांचा समावेश असू शकतो."
          },
          preventiveMeasures: {
            en: [
              "Be cautious with unknown documents",
              "Validate financial or academic records before use"
            ],
            hi: [
              "अज्ञात दस्तावेज़ों के साथ सावधान रहें",
              "उपयोग से पहले वित्तीय या शैक्षणिक रिकॉर्ड सत्यापित करें"
            ],
            mr: [
              "अज्ञात दस्तऐवजांसह सावध रहा",
              "वापरण्यापूर्वी आर्थिक किंवा शैक्षणिक नोंदी सत्यापित करा"
            ]
          },
          example: {
            en: "Example: Fake bank statements to get loans.",
            hi: "उदाहरण: ऋण प्राप्त करने के लिए नकली बैंक स्टेटमेंट।",
            mr: "उदाहरण: कर्ज घेण्यासाठी खोटे बँक स्टेटमेंट."
          }
        },
        {
          name: {
            en: "Using Forged Records",
            hi: "जाली दस्तावेज़ों का उपयोग",
            mr: "फसव्या नोंदींचा वापर"
          },
          section: {
            en: "Section 471 – IPC",
            hi: "अनुभाग 471 – आईपीसी",
            mr: "कलम 471 – IPC"
          },
          description: {
            en: "Using forged electronic records as genuine is a criminal offense. Protects digital trust in transactions and official processes.",
            hi: "जाली इलेक्ट्रॉनिक रिकॉर्ड को वास्तविक के रूप में उपयोग करना अपराध है। यह लेनदेन और आधिकारिक प्रक्रियाओं में डिजिटल भरोसे की सुरक्षा करता है।",
            mr: "फसवे इलेक्ट्रॉनिक नोंदी खऱ्या प्रमाणे वापरणे गुन्हा आहे. हे व्यवहार आणि अधिकृत प्रक्रियेत डिजिटल विश्वास संरक्षित करते."
          },
          preventiveMeasures: {
            en: [
              "Avoid submitting fake documents",
              "Verify sources before accepting digital records"
            ],
            hi: [
              "जाली दस्तावेज़ जमा करने से बचें",
              "डिजिटल रिकॉर्ड स्वीकार करने से पहले स्रोत सत्यापित करें"
            ],
            mr: [
              "फसवे दस्तऐवज सादर करण्यापासून टाळा",
              "डिजिटल नोंदी स्वीकारण्यापूर्वी स्रोत सत्यापित करा"
            ]
          },
          example: {
            en: "Example: Submitting fake digital certificates for a job application.",
            hi: "उदाहरण: नौकरी के आवेदन के लिए नकली डिजिटल प्रमाणपत्र जमा करना।",
            mr: "उदाहरण: नोकरीसाठी अर्ज करताना खोटे डिजिटल प्रमाणपत्र सादर करणे."
          }
        },
        {
          name: {
            en: "Criminal Intimidation via Anonymous Communication",
            hi: "गुमनाम संचार के माध्यम से आपराधिक धमकी",
            mr: "अज्ञात संवादाद्वारे फौजदारी धमकी"
          },
          section: {
            en: "Section 507 – IPC",
            hi: "अनुभाग 507 – आईपीसी",
            mr: "कलम 507 – IPC"
          },
          description: {
            en: "Sending threats or intimidating messages anonymously online falls under this section. Covers emails, social media messages, or other digital communication channels.",
            hi: "अनामिक रूप से ऑनलाइन धमकी या डराने वाले संदेश भेजना इस अनुभाग के तहत आता है। इसमें ईमेल, सोशल मीडिया संदेश या अन्य डिजिटल संचार चैनल शामिल हैं।",
            mr: "अनामिक पद्धतीने ऑनलाइन धमक्या किंवा धमकवणारे संदेश पाठवणे या कलमात येते. यात ईमेल, सोशल मीडिया संदेश किंवा इतर डिजिटल संवाद माध्यमांचा समावेश आहे."
          },
          preventiveMeasures: {
            en: [
              "Do not send threatening messages",
              "Report anonymous threats to authorities",
              "Enable privacy controls on social platforms"
            ],
            hi: [
              "धमकी भरे संदेश न भेजें",
              "अनाम धमकियों की रिपोर्टिंग करें",
              "सोशल प्लेटफॉर्म पर गोपनीयता नियंत्रण सक्षम करें"
            ],
            mr: [
              "धमकावणारे संदेश पाठवू नका",
              "अज्ञात धमक्यांची अधिकाऱ्यांना माहिती द्या",
              "सामाजिक प्लॅटफॉर्मवर गोपनीयता नियंत्रणे सक्षम करा"
            ]
          },
          example: {
            en: "Example: Sending threatening emails from fake IDs.",
            hi: "उदाहरण: नकली आईडी से धमकी भरे ईमेल भेजना।",
            mr: "उदाहरण: खोट्या आयडीवरून धमकावणारे ईमेल पाठवणे."
          }
        },
        {
          name: {
            en: "Defamation",
            hi: "मानहानि",
            mr: "मानहानी"
          },
          section: {
            en: "Section 499 – IPC",
            hi: "अनुभाग 499 – आईपीसी",
            mr: "कलम 499 – IPC"
          },
          description: {
            en: "Publishing false statements online to harm someone’s reputation is illegal. Social media posts, blogs, or forums can all be subject to this law.",
            hi: "किसी की प्रतिष्ठा को नुकसान पहुँचाने के लिए ऑनलाइन झूठे बयान प्रकाशित करना अवैध है। सोशल मीडिया पोस्ट, ब्लॉग या फोरम सभी इस कानून के अंतर्गत आते हैं।",
            mr: "कोणाच्याही प्रतिष्ठेला नुकसान पोहचवण्यासाठी ऑनलाइन खोट्या विधान प्रकाशित करणे बेकायदेशीर आहे. सोशल मीडिया पोस्ट, ब्लॉग किंवा फोरम यासर्व या कायद्याच्या अंतर्गत येतात."
          },
          preventiveMeasures: {
            en: [
              "Verify facts before posting online",
              "Avoid sharing rumors or unverified information",
              "Respect others’ reputation and privacy"
            ],
            hi: [
              "ऑनलाइन पोस्ट करने से पहले तथ्यों की पुष्टि करें",
              "अफवाहें या अविश्वसनीय जानकारी साझा करने से बचें",
              "दूसरों की प्रतिष्ठा और गोपनीयता का सम्मान करें"
            ],
            mr: [
              "ऑनलाइन पोस्ट करण्यापूर्वी तथ्य तपासा",
              "अफवा किंवा अविश्वसनीय माहिती शेअर करू नका",
              "इतरांच्या प्रतिष्ठा आणि गोपनीयतेचा सन्मान करा"
            ]
          },
          example: {
            en: "Example: Posting defamatory tweets about someone.",
            hi: "उदाहरण: किसी के बारे में मानहानि वाली ट्वीट पोस्ट करना।",
            mr: "उदाहरण: कोणाबद्दल मानहानीची ट्विट पोस्ट करणे."
          }
        }
            
    ]
  };

  return (
    <div className="cyber-laws-container">
      <h2 className="page-title">Cyber Laws in India</h2>
      <p className="intro">
        Learn the key sections under the IT Act, 2000 and IPC that protect you from cybercrime.
      </p>

      {/* Language Switcher */}
      <div className="lang-switcher mb-6 flex gap-3 justify-center">
        <button onClick={() => setLang("en")} className={lang === "en" ? "active" : ""}>English</button>
        <button onClick={() => setLang("hi")} className={lang === "hi" ? "active" : ""}>हिंदी</button>
        <button onClick={() => setLang("mr")} className={lang === "mr" ? "active" : ""}>मराठी</button>
      </div>

      {Object.keys(laws).map((category) => (
        <div key={category} className="category-section">
          <h3 className={`category-title ${category === "IT Act, 2000" ? "blue" : "purple"}`}>
            {category}
          </h3>
          <div className="cyber-laws-grid">
            {laws[category].map((law, index) => (
              <div key={index} className="law-card cool-card">
                <div className="law-header">
                  <h4>{law.name[lang]}</h4>
                  <span>{law.section[lang]}</span>
                </div>
                <p className="description">{law.description[lang]}</p>

                {law.preventiveMeasures && (
                  <ul className="preventive">
                    {law.preventiveMeasures[lang].map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                <p className="example">{law.example[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CyberLaws;
