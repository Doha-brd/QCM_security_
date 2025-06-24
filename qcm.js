const questions = [
  {
    question: "Pourquoi la protection des données est-elle essentielle ?",
    choices: [
      "Pour envoyer des publicités ciblées",
      "Pour éviter les fuites de données et protéger la vie privée",
      "Pour augmenter le trafic d’un site",
      "Pour améliorer le référencement Google"
    ],
    correctAnswer: 1
  },
  {
    question: "Qu’est-ce qu’une donnée personnelle ?",
    choices: [
      "Une information publique",
      "Un fichier informatique",
      "Une information qui identifie directement ou indirectement une personne",
      "Un cookie technique"
    ],
    correctAnswer: 2
  },
  {
    question: "Quel est l’objectif principal du RGPD ?",
    choices: [
      "Faciliter la publicité en ligne",
      "Protéger les données personnelles des citoyens de l’UE",
      "Partager les données librement",
      "Créer des mots de passe"
    ],
    correctAnswer: 1
  },
  {
    question: "Quelle est une bonne pratique de sécurité ?",
    choices: [
      "Utiliser le même mot de passe partout",
      "Partager ses identifiants par mail",
      "Utiliser l’authentification à deux facteurs",
      "Désactiver les mises à jour"
    ],
    correctAnswer: 2
  },
  {
    question: "Qui est responsable de la protection des données dans une entreprise ?",
    choices: [
      "Le réceptionniste",
      "Le DPO (Délégué à la Protection des Données)",
      "Le client",
      "Le community manager"
    ],
    correctAnswer: 1
  },
  {
    question: "Qu’est-ce qu’une violation de données ?",
    choices: [
      "Une panne de courant",
      "Un oubli de sauvegarde",
      "Un accès non autorisé ou une fuite de données",
      "Une suppression manuelle d’un fichier"
    ],
    correctAnswer: 2
  },
  {
    question: "Que doit faire un site web en cas de collecte de données ?",
    choices: [
      "Ne rien dire",
      "Informer l’utilisateur et demander son consentement",
      "Afficher des pubs",
      "Collecter tout automatiquement"
    ],
    correctAnswer: 1
  },
  {
    question: "Une adresse IP est-elle une donnée personnelle ?",
    choices: [
      "Non",
      "Oui, car elle peut permettre d’identifier une personne",
      "Seulement en Europe",
      "Uniquement si elle est publique"
    ],
    correctAnswer: 1
  },
  {
    question: "Quel est le rôle d’un mot de passe fort ?",
    choices: [
      "Décorer le compte utilisateur",
      "Protéger l’accès aux données",
      "Partager les fichiers",
      "Créer une sauvegarde automatique"
    ],
    correctAnswer: 1
  },
  {
    question: "Qu’est-ce que le chiffrement ?",
    choices: [
      "La suppression des données",
      "Le stockage en ligne",
      "Une technique qui remplace les données par des identifiants fictifs",
      "Une technique pour rendre les données illisibles sans clé"
    ],
    correctAnswer: 4
  }
];

let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);

function showQuestion(index) {
  const container = document.getElementById("question-container");
  const q = questions[index];
  let html = `<div class="question">${index + 1}. ${q.question}</div><div class="choices">`;

  q.choices.forEach((choice, i) => {
    const checked = userAnswers[index] === i ? "checked" : "";
    html += `
      <label>
        <input type="radio" name="choice" value="${i}" ${checked}>
        ${choice}
      </label>`;
  });

  html += `</div>`;
  container.innerHTML = html;

  document.getElementById("prev-btn").disabled = index === 0;
  document.getElementById("next-btn").textContent = (index === questions.length - 1) ? "Terminer" : "Suivant ➡";
}

function saveAnswer() {
  const selected = document.querySelector('input[name="choice"]:checked');
  if (selected) {
    userAnswers[currentQuestion] = parseInt(selected.value);
  }
}

function nextQuestion() {
  saveAnswer();
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion(currentQuestion);
  } else {
    showResult();
  }
}

function prevQuestion() {
  saveAnswer();
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion(currentQuestion);
  }
}

function showResult() {
  saveAnswer();
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.correctAnswer) {
      score++;
    }
  });

  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").innerHTML =
    `✅ Vous avez obtenu <strong>${score} / ${questions.length}</strong> bonnes réponses.`;
}

showQuestion(currentQuestion);
