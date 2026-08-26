export interface DiagnosticQuestion {
  question_id: string;
  subject_id: string;
  subject_name: string;
  topic: string;
  question_text: string;
  options: string[];
  correct_option: string;
  difficulty_tag: "beginner" | "intermediate" | "advanced";
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  // Financial Literacy (sub_finance)
  {
    question_id: "fl_q1",
    subject_id: "sub_finance",
    subject_name: "Financial Literacy",
    topic: "savings",
    question_text: "What is the main reason to save money before spending it?",
    options: [
      "To avoid paying direct taxes on current income",
      "To ensure future financial security & emergency fund",
      "To automatically increase your credit card limit",
      "To lock money away permanently without liquidity"
    ],
    correct_option: "To ensure future financial security & emergency fund",
    difficulty_tag: "beginner"
  },
  {
    question_id: "fl_q2",
    subject_id: "sub_finance",
    subject_name: "Financial Literacy",
    topic: "banking_basics",
    question_text: "What is a savings account primarily used for?",
    options: [
      "Active stock trading and speculative investments",
      "Unlimited daily high-volume corporate transactions",
      "Safekeeping surplus funds with liquidity & interest",
      "Offshore wealth hiding and tax avoidance"
    ],
    correct_option: "Safekeeping surplus funds with liquidity & interest",
    difficulty_tag: "beginner"
  },
  {
    question_id: "fl_q3",
    subject_id: "sub_finance",
    subject_name: "Financial Literacy",
    topic: "payments_settlement",
    question_text: "What is the key difference between NEFT and RTGS?",
    options: [
      "NEFT settles in batches; RTGS settles in real time (min ₹2L)",
      "RTGS is only for international transfers; NEFT is domestic",
      "NEFT requires paper cheques; RTGS is app-based",
      "NEFT has a mandatory minimum limit of ₹5 Lakh"
    ],
    correct_option: "NEFT settles in batches; RTGS settles in real time (min ₹2L)",
    difficulty_tag: "intermediate"
  },
  {
    question_id: "fl_q4",
    subject_id: "sub_finance",
    subject_name: "Financial Literacy",
    topic: "insurance_protection",
    question_text: "Up to what amount is a bank deposit insured per depositor in India under DICGC?",
    options: [
      "₹1 Lakh",
      "₹2 Lakh",
      "₹5 Lakh",
      "₹10 Lakh"
    ],
    correct_option: "₹5 Lakh",
    difficulty_tag: "intermediate"
  },
  {
    question_id: "fl_q5",
    subject_id: "sub_finance",
    subject_name: "Financial Literacy",
    topic: "investments",
    question_text: "What is the defining feature of a Unit Linked Insurance Plan (ULIP)?",
    options: [
      "It offers pure term cover with no investment element",
      "It is a fixed deposit backed by the Ministry of Finance",
      "It combines life insurance with market-linked investments",
      "It provides guaranteed physical gold delivery at maturity"
    ],
    correct_option: "It combines life insurance with market-linked investments",
    difficulty_tag: "advanced"
  },

  // Digital Safety (sub_digital_safety)
  {
    question_id: "ds_q1",
    subject_id: "sub_digital_safety",
    subject_name: "Digital Safety",
    topic: "secure_browsing",
    question_text: "What should you check before entering payment details on a shopping website?",
    options: [
      "The follower count on their social media profiles",
      "An https:// protocol and a valid padlock icon in URL",
      "Whether the website supports an AMOLED dark theme",
      "The presence of flash sale countdown timers"
    ],
    correct_option: "An https:// protocol and a valid padlock icon in URL",
    difficulty_tag: "beginner"
  },
  {
    question_id: "ds_q2",
    subject_id: "sub_digital_safety",
    subject_name: "Digital Safety",
    topic: "otp_security",
    question_text: "What should you do if you receive an OTP for an app or transaction you did not request?",
    options: [
      "Forward it to family groups to see if they bought items",
      "Call the support phone number inside the SMS text",
      "Never share it and report suspicious activity to bank",
      "Enter the OTP on the portal to decline the transaction"
    ],
    correct_option: "Never share it and report suspicious activity to bank",
    difficulty_tag: "beginner"
  },
  {
    question_id: "ds_q3",
    subject_id: "sub_digital_safety",
    subject_name: "Digital Safety",
    topic: "public_wifi",
    question_text: "Why should you avoid conducting banking transactions over public Wi-Fi?",
    options: [
      "Public Wi-Fi drains battery life twice as fast",
      "Open networks allow data interception via MitM attacks",
      "Banking apps require a direct 5G cellular connection",
      "ISPs charge automated surcharges for banking on Wi-Fi"
    ],
    correct_option: "Open networks allow data interception via MitM attacks",
    difficulty_tag: "intermediate"
  },
  {
    question_id: "ds_q4",
    subject_id: "sub_digital_safety",
    subject_name: "Digital Safety",
    topic: "digital_arrest_scam",
    question_text: "What is a key warning sign of a 'digital arrest' scam?",
    options: [
      "Receiving a physical legal notice via registered India Post",
      "Video callers posing as police demanding immediate money",
      "Receiving an automated monthly utility bill reminder",
      "An official OS update notification on your phone"
    ],
    correct_option: "Video callers posing as police demanding immediate money",
    difficulty_tag: "intermediate"
  },
  {
    question_id: "ds_q5",
    subject_id: "sub_digital_safety",
    subject_name: "Digital Safety",
    topic: "digital_lending",
    question_text: "What is the safest way to verify a lending app before taking a loan through it?",
    options: [
      "Check for 5-star ratings and positive reviews on stores",
      "Verify that the app's NBFC is listed on the RBI register",
      "Confirm if it gives instant loans without KYC verification",
      "Check if it requires full access to your contacts & photos"
    ],
    correct_option: "Verify that the app's NBFC is listed on the RBI register",
    difficulty_tag: "advanced"
  },

  // First Aid (sub_first_aid)
  {
    question_id: "fa_q1",
    subject_id: "sub_first_aid",
    subject_name: "First Aid",
    topic: "scene_safety",
    question_text: "What is the first step you should take when arriving at an emergency scene?",
    options: [
      "Immediately pull the victim into an upright sitting position",
      "Assess scene safety to ensure no danger to yourself",
      "Forcefully administer oral water and pain medications",
      "Search the casualty's pockets for personal ID"
    ],
    correct_option: "Assess scene safety to ensure no danger to yourself",
    difficulty_tag: "beginner"
  },
  {
    question_id: "fa_q2",
    subject_id: "sub_first_aid",
    subject_name: "First Aid",
    topic: "recovery_position",
    question_text: "What position should you place an unconscious person in if they are breathing normally?",
    options: [
      "Prone position (flat on their stomach)",
      "Recovery position (on side with airway tilted open)",
      "Seated upright with head bent toward chest",
      "Supine position with a thick pillow placed under head"
    ],
    correct_option: "Recovery position (on side with airway tilted open)",
    difficulty_tag: "beginner"
  },
  {
    question_id: "fa_q3",
    subject_id: "sub_first_aid",
    subject_name: "First Aid",
    topic: "good_samaritan",
    question_text: "According to Good Samaritan guidelines in India, what happens if you help an injured person and take them to a hospital?",
    options: [
      "You must bear all initial hospital and emergency fees",
      "You are legally forced to appear in all court hearings",
      "You are protected from liability and cannot be detained",
      "Police must detain you until family members arrive"
    ],
    correct_option: "You are protected from liability and cannot be detained",
    difficulty_tag: "intermediate"
  },
  {
    question_id: "fa_q4",
    subject_id: "sub_first_aid",
    subject_name: "First Aid",
    topic: "adult_cpr",
    question_text: "What is the correct ratio of chest compressions to rescue breaths during adult CPR?",
    options: [
      "15 compressions to 2 rescue breaths",
      "30 compressions to 2 rescue breaths",
      "50 compressions to 5 rescue breaths",
      "10 compressions to 1 rescue breath"
    ],
    correct_option: "30 compressions to 2 rescue breaths",
    difficulty_tag: "intermediate"
  },
  {
    question_id: "fa_q5",
    subject_id: "sub_first_aid",
    subject_name: "First Aid",
    topic: "infant_cpr",
    question_text: "How should chest compressions differ when performing CPR on a baby under one year old compared to an adult?",
    options: [
      "Use 2 fingers/thumbs, compressing ~1.5 inches deep",
      "Use heel of both hands with full body weight (3 inches)",
      "Deliver downward compressions directly on abdomen",
      "Skip compressions entirely and only deliver breaths"
    ],
    correct_option: "Use 2 fingers/thumbs, compressing ~1.5 inches deep",
    difficulty_tag: "advanced"
  },

  // Communication Skills (sub_communication)
  {
    question_id: "cs_q1",
    subject_id: "sub_communication",
    subject_name: "Communication Skills",
    topic: "communication_process",
    question_text: "In the communication process, who is the 'receiver'?",
    options: [
      "The originator who encodes and transmits the message",
      "The physical channel through which data is sent",
      "The target audience who perceives & decodes the message",
      "The ambient noise causing signal degradation"
    ],
    correct_option: "The target audience who perceives & decodes the message",
    difficulty_tag: "beginner"
  },
  {
    question_id: "cs_q2",
    subject_id: "sub_communication",
    subject_name: "Communication Skills",
    topic: "nonverbal_communication",
    question_text: "What does non-verbal communication include?",
    options: [
      "Formal written memos and structured email reports",
      "Facial expressions, eye contact, body language & tone",
      "Prepared oral presentations and keynote speeches",
      "Direct telephonic dialogue"
    ],
    correct_option: "Facial expressions, eye contact, body language & tone",
    difficulty_tag: "beginner"
  },
  {
    question_id: "cs_q3",
    subject_id: "sub_communication",
    subject_name: "Communication Skills",
    topic: "public_speaking",
    question_text: "What does the 3Ps method for public speaking stand for?",
    options: [
      "Pitch, Posture, Presence",
      "Prepare, Practice, Perform (or Present)",
      "Plan, Publish, Promote",
      "Pacing, Projection, Pause"
    ],
    correct_option: "Prepare, Practice, Perform (or Present)",
    difficulty_tag: "intermediate"
  },
  {
    question_id: "cs_q4",
    subject_id: "sub_communication",
    subject_name: "Communication Skills",
    topic: "psychological_barriers",
    question_text: "Which of the following is an example of a psychological barrier to communication?",
    options: [
      "Heavy background construction sound in an office",
      "Unstable network connection causing audio dropouts",
      "Anger, defensiveness, high stress, or prejudice",
      "Jargon and language vocabulary mismatches"
    ],
    correct_option: "Anger, defensiveness, high stress, or prejudice",
    difficulty_tag: "intermediate"
  },
  {
    question_id: "cs_q5",
    subject_id: "sub_communication",
    subject_name: "Communication Skills",
    topic: "7cs_communication",
    question_text: "According to the 7Cs of communication, which of these is NOT one of the principles?",
    options: [
      "Clarity",
      "Conciseness",
      "Complexity",
      "Courtesy"
    ],
    correct_option: "Complexity",
    difficulty_tag: "advanced"
  }
];
