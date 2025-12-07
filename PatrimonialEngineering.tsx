'use client';

import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Scatter, ScatterChart, ZAxis } from 'recharts';

type TabType = 'succession' | 'immobilier' | 'cartographie' | 'international';
type SuccessionSubTab = 'calcul' | 'optimisation' | 'dutreil' | 'demembrement' | 'donation' | 'assurance-vie';
type ImmobilierSubTab = 'sci' | 'lmnp' | 'scpi' | 'deficit-foncier' | 'malraux';

const COLORS = ['#FFD700', '##FFA500', '#FF8C00', '#DAA520', '#B8860B', '#F4C430'];

const legalThemes = [
  {
    id: 'succession',
    title: 'Succession & Transmission',
    icon: 'ri-parent-line',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    hoverBorder: 'hover:border-purple-500/60',
    description: 'Optimisez la transmission de votre patrimoine',
    content: {
      intro: 'La succession est un moment clé dans la transmission du patrimoine. Une planification anticipée permet d\'optimiser les droits de succession et de protéger vos héritiers.',
      sections: [
        {
          title: 'Droits de Succession 2024',
          items: [
            'Abattement parent-enfant : 100 000 € par parent et par enfant tous les 15 ans',
            'Abattement conjoint : 80 724 € (exonération totale si donation au dernier vivant)',
            'Abattement petit-enfant : 31 865 € par grand-parent',
            'Abattement frère/sœur : 15 932 €',
            'Barème progressif : de 5% à 45% selon le montant et le lien de parenté',
            'Exonération totale pour le conjoint survivant et le partenaire de PACS'
          ]
        },
        {
          title: 'Stratégies d\'Optimisation',
          items: [
            'Donations anticipées : Utiliser les abattements tous les 15 ans pour réduire la base taxable',
            'Donation-partage : Figer la valeur des biens au jour de la donation',
            'Démembrement de propriété : Donner la nue-propriété en conservant l\'usufruit',
            'Assurance-vie : Transmission hors succession avec abattement de 152 500 € par bénéficiaire',
            'SCI familiale : Faciliter la transmission progressive et réduire la valeur des parts',
            'Pacte Dutreil : Exonération de 75% sur la transmission d\'entreprise'
          ]
        },
        {
          title: 'Outils de Transmission',
          items: [
            'Testament : Organiser la répartition de vos biens dans le respect de la réserve héréditaire',
            'Donation au dernier vivant : Protéger le conjoint survivant',
            'Mandat de protection future : Anticiper une éventuelle perte d\'autonomie',
            'Clause bénéficiaire assurance-vie : Optimiser la transmission et protéger les proches',
            'Trust ou fiducie : Pour les patrimoines internationaux complexes'
          ]
        },
        {
          title: 'Calendrier Fiscal',
          items: [
            'Déclaration de succession : Dans les 6 mois suivant le décès (12 mois si décès à l\'étranger)',
            'Paiement des droits : Possibilité de paiement fractionné ou différé sous conditions',
            'Renouvellement des abattements : Tous les 15 ans pour les donations',
            'Actualisation des valeurs : Réévaluer régulièrement la valeur de votre patrimoine'
          ]
        }
      ],
      tips: [
        '💡 Anticipez : Plus vous planifiez tôt, plus vous optimisez',
        '💡 Diversifiez : Utilisez plusieurs outils de transmission complémentaires',
        '💡 Actualisez : Revoyez votre stratégie tous les 5 ans ou en cas d\'événement majeur',
        '💡 Consultez : Faites-vous accompagner par un notaire et un conseiller en gestion de patrimoine'
      ]
    }
  },
  {
    id: 'immobilier',
    title: 'Immobilier & SCI',
    icon: 'ri-building-line',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    hoverBorder: 'hover:border-blue-500/60',
    description: 'Structurez votre patrimoine immobilier',
    content: {
      intro: 'L\'immobilier représente souvent la part la plus importante du patrimoine. Une structuration adaptée permet d\'optimiser la gestion et la transmission.',
      sections: [
        {
          title: 'SCI Familiale',
          items: [
            'Création et fonctionnement d\'une SCI',
            'Avantages fiscaux et patrimoniaux',
            'Transmission progressive des parts',
            'Gestion et gouvernance',
            'Décote sur la valeur des parts (10% à 30%)',
            'Démembrement de propriété des parts'
          ]
        },
        {
          title: 'Dispositifs fiscaux',
          items: [
            'LMNP : Location meublée non professionnelle',
            'Déficit foncier et travaux déductibles',
            'Loi Malraux : Restauration du patrimoine',
            'SCPI et démembrement',
            'Pinel : Investissement locatif neuf',
            'Monuments Historiques : Déduction intégrale'
          ]
        },
        {
          title: 'Acquisition Immobilière',
          items: [
            'Compromis de vente et conditions suspensives',
            'Diagnostics obligatoires (DPE, amiante, plomb, etc.)',
            'Frais de notaire : 7-8% ancien, 2-3% neuf',
            'Garanties décennale et parfait achèvement',
            'Servitudes et urbanisme',
            'Délai de rétractation de 10 jours'
          ]
        },
        {
          title: 'Location et Copropriété',
          items: [
            'Bail d\'habitation : 3 ans (vide) ou 1 an (meublé)',
            'Encadrement des loyers en zones tendues',
            'Charges de copropriété et assemblées générales',
            'Règlement de copropriété et syndic',
            'Travaux et majorités requises',
            'Carnet d\'entretien obligatoire'
          ]
        }
      ],
      tips: [
        '🏠 SCI pour faciliter la transmission',
        '💰 LMNP pour optimiser la fiscalité',
        '🔧 Déficit foncier sur travaux',
        '📊 Diversifier avec des SCPI'
      ]
    }
  },
  {
    id: 'assurance-vie',
    title: 'Assurance-vie',
    icon: 'ri-shield-check-line',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    hoverBorder: 'hover:border-green-500/60',
    description: 'Optimisez votre épargne et transmission',
    content: {
      intro: 'L\'assurance-vie est un outil patrimonial majeur offrant souplesse, fiscalité avantageuse et transmission optimisée.',
      sections: [
        {
          title: 'Fiscalité',
          items: [
            'Versements avant 70 ans : abattement 152 500 € par bénéficiaire',
            'Versements après 70 ans : abattement 30 500 € global',
            'Fiscalité des rachats selon ancienneté',
            'Prélèvements sociaux et IR',
            'Abattement de 4 600 € (9 200 € couple) après 8 ans',
            'Transmission hors succession'
          ]
        },
        {
          title: 'Clause bénéficiaire',
          items: [
            'Rédaction optimale de la clause',
            'Démembrement de la clause',
            'Bénéficiaires hors succession',
            'Modification et révocabilité',
            'Protection du conjoint et des enfants',
            'Clause type et clause sur-mesure'
          ]
        },
        {
          title: 'Supports d\'investissement',
          items: [
            'Fonds euros : Capital garanti, rendement modéré',
            'Unités de compte : Performance potentielle, risque de perte',
            'Fonds immobiliers (SCPI, OPCI)',
            'Actions et obligations',
            'Private equity et fonds structurés',
            'Gestion pilotée ou libre'
          ]
        },
        {
          title: 'Stratégies avancées',
          items: [
            'Multi-contrats pour optimiser les abattements',
            'Nantissement pour garantir un prêt',
            'Avance sur contrat en cas de besoin',
            'Arbitrages pour optimiser la performance',
            'Rachats programmés pour compléter revenus',
            'Assurance-vie luxembourgeoise pour hauts patrimoines'
          ]
        }
      ],
      tips: [
        '💎 Privilégier les versements avant 70 ans',
        '📝 Rédiger une clause bénéficiaire précise',
        '🔄 Diversifier les supports',
        '⏰ Ouvrir tôt pour optimiser la fiscalité'
      ]
    }
  },
  {
    id: 'entreprise',
    title: 'Entreprise & Pacte Dutreil',
    icon: 'ri-briefcase-line',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    hoverBorder: 'hover:border-orange-500/60',
    description: 'Transmettez votre entreprise en optimisant',
    content: {
      intro: 'La transmission d\'entreprise bénéficie de dispositifs fiscaux avantageux, notamment le Pacte Dutreil permettant une exonération de 75%.',
      sections: [
        {
          title: 'Pacte Dutreil',
          items: [
            'Exonération de 75% de la valeur',
            'Engagement collectif de 2 ans',
            'Engagement individuel de 4 ans',
            'Fonction de direction obligatoire',
            'Activité opérationnelle requise',
            'Économie fiscale jusqu\'à 150 000 € et plus'
          ]
        },
        {
          title: 'Autres dispositifs',
          items: [
            'Holding animatrice',
            'Management package',
            'Apport-cession',
            'LBO familial',
            'Donation-cession',
            'Intégration fiscale'
          ]
        },
        {
          title: 'Structures sociétaires',
          items: [
            'SARL de famille : Fiscalité IR + responsabilité limitée',
            'SAS : Souplesse statutaire et gouvernance',
            'Holding patrimoniale : Optimisation groupe',
            'SCI : Détention immobilier professionnel',
            'SEL : Professions libérales réglementées',
            'SASU : Entrepreneur individuel protégé'
          ]
        },
        {
          title: 'Préparation de la transmission',
          items: [
            'Valorisation de l\'entreprise',
            'Audit juridique et fiscal',
            'Formation des repreneurs',
            'Pacte d\'actionnaires',
            'Garantie de passif',
            'Accompagnement post-transmission'
          ]
        }
      ],
      tips: [
        '🏆 Pacte Dutreil : jusqu\'à 75% d\'exonération',
        '⏱️ Anticiper 2 ans avant transmission',
        '👔 Fonction de direction requise',
        '📋 Respecter scrupuleusement les engagements'
      ]
    }
  },
  {
    id: 'fiscal',
    title: 'Optimisation Fiscale',
    icon: 'ri-money-euro-circle-line',
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    hoverBorder: 'hover:border-yellow-500/60',
    description: 'Réduisez légalement votre fiscalité',
    content: {
      intro: 'L\'optimisation fiscale légale permet de réduire significativement la pression fiscale tout en respectant la législation.',
      sections: [
        {
          title: 'IR et TMI',
          items: [
            'Optimisation de la tranche marginale',
            'Déductions et réductions d\'impôt',
            'Revenus fonciers et déficit',
            'Plus-values et abattements',
            'Lissage des revenus',
            'Arbitrage revenus/plus-values'
          ]
        },
        {
          title: 'IFI',
          items: [
            'Assiette taxable et exonérations',
            'Déduction des dettes',
            'Biens professionnels exonérés',
            'Stratégies de réduction',
            'Démembrement temporaire',
            'Plafonnement à 75% des revenus'
          ]
        },
        {
          title: 'Niches fiscales',
          items: [
            'Déficit foncier : 10 700 €/an (21 400 € énergétique)',
            'LMNP : Amortissement du bien',
            'Girardin : 110% à 120% de réduction',
            'FIP/FCPI : 25% de réduction',
            'Sofica : 30% à 48% de réduction',
            'Monuments Historiques : Déduction intégrale'
          ]
        },
        {
          title: 'Enveloppes fiscales',
          items: [
            'PEA : Exonération après 5 ans',
            'PEA-PME : Plafond 225 000 €',
            'Assurance-vie : Abattement après 8 ans',
            'PER : Déduction des versements',
            'PEE/PERCO : Abondement exonéré',
            'Compte-titres ordinaire'
          ]
        },
        {
          title: 'Réductions et crédits',
          items: [
            'Dons : 66% ou 75% de réduction',
            'Emploi à domicile : 50% de crédit',
            'Garde d\'enfants : 50% de crédit',
            'Investissement PME : 25% de réduction',
            'Travaux énergétiques : MaPrimeRénov\'',
            'Frais de scolarité : Réduction selon niveau'
          ]
        }
      ],
      tips: [
        '💰 Défiscaliser via l\'immobilier',
        '📊 Optimiser la répartition des revenus',
        '🏢 Biens professionnels hors IFI',
        '💳 Déduire les dettes de l\'IFI'
      ]
    }
  },
  {
    id: 'international',
    title: 'Patrimoine International',
    icon: 'ri-global-line',
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    hoverBorder: 'hover:border-cyan-500/60',
    description: 'Gérez votre patrimoine à l\'international',
    content: {
      intro: 'La gestion d\'un patrimoine international nécessite une expertise spécifique pour naviguer entre les différentes législations.',
      sections: [
        {
          title: 'Résidence fiscale',
          items: [
            'Critères de résidence fiscale',
            'Conventions fiscales internationales',
            'Exit tax et départ à l\'étranger',
            'Retour en France',
            'Double résidence',
            'Sursis de paiement exit tax'
          ]
        },
        {
          title: 'Actifs étrangers',
          items: [
            'Déclaration des comptes étrangers (n°3916)',
            'Trusts et fondations',
            'Immobilier à l\'étranger',
            'Succession internationale',
            'FATCA et CRS',
            'Assurance-vie luxembourgeoise'
          ]
        },
        {
          title: 'Investissements internationaux',
          items: [
            'Immobilier étranger : Fiscalité locale + France',
            'Sociétés étrangères contrôlées',
            'Dividendes étrangers et crédit d\'impôt',
            'Compte-titres étranger',
            'Cryptomonnaies à l\'étranger',
            'Fonds d\'investissement offshore'
          ]
        },
        {
          title: 'Zones stratégiques',
          items: [
            'Luxembourg : Assurance-vie, fonds',
            'Suisse : Gestion privée, stabilité',
            'Belgique : Proximité, fiscalité',
            'Royaume-Uni : Trusts, marché financier',
            'États-Unis : Marché développé, FATCA',
            'Singapour/Hong Kong : Hubs asiatiques'
          ]
        }
      ],
      tips: [
        '🌍 Déclarer tous les comptes étrangers',
        '📋 Respecter les conventions fiscales',
        '⚠️ Attention à l\'exit tax',
        '🔍 Anticiper la succession internationale'
      ]
    }
  },
  {
    id: 'couple',
    title: 'Couple & Famille',
    icon: 'ri-heart-line',
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    hoverBorder: 'hover:border-pink-500/60',
    description: 'Protégez votre conjoint et vos enfants',
    content: {
      intro: 'Le régime matrimonial et les dispositions familiales ont un impact majeur sur la gestion et la transmission du patrimoine.',
      sections: [
        {
          title: 'Régimes matrimoniaux',
          items: [
            'Communauté réduite aux acquêts (régime légal)',
            'Séparation de biens',
            'Participation aux acquêts',
            'Communauté universelle',
            'Changement de régime matrimonial',
            'Avantages matrimoniaux'
          ]
        },
        {
          title: 'Protection du conjoint',
          items: [
            'Donation au dernier vivant',
            'Usufruit du logement',
            'Assurance-vie au profit du conjoint',
            'SCI et démembrement',
            'Clause de préciput',
            'Exonération totale de droits de succession'
          ]
        },
        {
          title: 'PACS et concubinage',
          items: [
            'PACS : Régime de l\'indivision ou séparation',
            'Exonération de droits pour partenaire PACS',
            'Concubinage : Aucun droit successoral',
            'Testament obligatoire pour concubins',
            'Assurance-vie pour protéger le concubin',
            'Donation entre concubins : 60% de droits'
          ]
        },
        {
          title: 'Enfants et famille recomposée',
          items: [
            'Réserve héréditaire des enfants',
            'Quotité disponible',
            'Adoption simple vs adoption plénière',
            'Famille recomposée : Stratégies',
            'Donation-partage transgénérationnelle',
            'Protection des enfants d\'un premier lit'
          ]
        }
      ],
      tips: [
        '💑 Adapter le régime matrimonial',
        '🏠 Protéger le conjoint survivant',
        '👨‍👩‍👧‍👦 Équilibrer entre conjoint et enfants',
        '📝 Donation au dernier vivant'
      ]
    }
  },
  {
    id: 'retraite',
    title: 'Retraite & Prévoyance',
    icon: 'ri-time-line',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    hoverBorder: 'hover:border-indigo-500/60',
    description: 'Préparez sereinement votre retraite',
    content: {
      intro: 'La préparation de la retraite nécessite une stratégie patrimoniale adaptée pour maintenir son niveau de vie.',
      sections: [
        {
          title: 'Épargne retraite',
          items: [
            'PER : Plan Épargne Retraite',
            'Article 83 et PERCO',
            'Madelin pour indépendants',
            'Optimisation fiscale des versements',
            'Sortie en rente ou capital',
            'Déduction des versements du revenu'
          ]
        },
        {
          title: 'Revenus complémentaires',
          items: [
            'Immobilier locatif',
            'SCPI de rendement',
            'Dividendes et revenus financiers',
            'Rentes viagères',
            'Cumul emploi-retraite',
            'Activité indépendante'
          ]
        },
        {
          title: 'Régimes de retraite',
          items: [
            'Régime de base : Sécurité sociale',
            'Régime complémentaire : Agirc-Arrco',
            'Âge légal : 64 ans',
            'Taux plein : 67 ans ou 172 trimestres',
            'Décote et surcote',
            'Minimum contributif'
          ]
        },
        {
          title: 'Optimisation',
          items: [
            'Rachat de trimestres',
            'Report du départ : Surcote 1,25%/trimestre',
            'Versements PER en années hauts revenus',
            'Constitution patrimoine locatif',
            'Diversification des sources',
            'Simulation et anticipation'
          ]
        }
      ],
      tips: [
        '💼 Ouvrir un PER pour défiscaliser',
        '🏘️ Investir dans l\'immobilier locatif',
        '📈 Diversifier les sources de revenus',
        '⏰ Commencer tôt pour l\'effet cumulé'
      ]
    }
  }
];

export default function PatrimonialEngineering() {
  const [activeTab, setActiveTab] = useState<TabType>('succession');
  const [successionSubTab, setSuccessionSubTab] = useState<SuccessionSubTab>('calcul');
  const [immobilierSubTab, setImmobilierSubTab] = useState<ImmobilierSubTab>('sci');
  const [selectedLegalTheme, setSelectedLegalTheme] = useState<string | null>(null);

  const [patrimoine, setPatrimoine] = useState(500000);
  const [lienParente, setLienParente] = useState('enfant');
  const [nombreBeneficiaires, setNombreBeneficiaires] = useState(2);
  const [donationsAnterieures, setDonationsAnterieures] = useState(0);

  const [age, setAge] = useState(65);
  const [patrimoineTotal, setPatrimoineTotal] = useState(1000000);
  const [revenusAnnuels, setRevenusAnnuels] = useState(80000);
  const [objectifTransmission, setObjectifTransmission] = useState(800000);

  const [valeurBien, setValeurBien] = useState(300000);
  const [ageUsufuitier, setAgeUsufuitier] = useState(70);
  const [dureeUsufruit, setDureeUsufruit] = useState(0);

  const [montantDonation, setMontantDonation] = useState(100000);
  const [typeDonation, setTypeDonation] = useState('simple');
  const [frequenceDonation, setFrequenceDonation] = useState(15);

  const [capitalAssuranceVie, setCapitalAssuranceVie] = useState(200000);
  const [ageSouscription, setAgeSouscription] = useState(60);
  const [versementsApres70, setVersementsApres70] = useState(50000);

  const [capitalSCI, setCapitalSCI] = useState(500000);
  const [nombreParts, setNombreParts] = useState(1000);
  const [revenusLocatifs, setRevenusLocatifs] = useState(30000);
  const [chargesSCI, setChargesSCI] = useState(8000);

  const [prixAchatLMNP, setPrixAchatLMNP] = useState(250000);
  const [loyerMensuel, setLoyerMensuel] = useState(1200);
  const [chargesAnnuelles, setChargesAnnuelles] = useState(3000);
  const [dureeAmortissement, setDureeAmortissement] = useState(20);

  const [montantInvestissementSCPI, setMontantInvestissementSCPI] = useState(100000);
  const [tauxRendementSCPI, setTauxRendementSCPI] = useState(4.5);
  const [typeDembrementSCPI, setTypeDembrementSCPI] = useState('pleine-propriete');
  const [dureeDecombrementSCPI, setDureeDecombrementSCPI] = useState(15);
  const [decoteSCPI, setDecoteSCPI] = useState(35);
  const [horizonInvestissementSCPI, setHorizonInvestissementSCPI] = useState(20);

  const [prixAchatDeficit, setPrixAchatDeficit] = useState(200000);
  const [montantTravauxDeficit, setMontantTravauxDeficit] = useState(50000);
  const [loyerMensuelDeficit, setLoyerMensuelDeficit] = useState(800);
  const [chargesAnnuellesDeficit, setChargesAnnuellesDeficit] = useState(2000);
  const [TMIDeficit, setTMIDeficit] = useState(30);
  const [dureeTravauxDeficit, setDureeTravauxDeficit] = useState(2);

  const [prixAchatPinel, setPrixAchatPinel] = useState(250000);
  const [surfacePinel, setSurfacePinel] = useState(50);
  const [loyerMensuelPinel, setLoyerMensuelPinel] = useState(900);
  const [dureePinel, setDureePinel] = useState(12);
  const [zonePinel, setZonePinel] = useState('A');
  const [typePinel, setTypePinel] = useState('pinel-plus');

  const [prixAchatMalraux, setPrixAchatMalraux] = useState(300000);
  const [montantTravauxMalraux, setMontantTravauxMalraux] = useState(200000);
  const [tauxReductionMalraux, setTauxReductionMalraux] = useState(30);
  const [loyerMensuelMalraux, setLoyerMensuelMalraux] = useState(1200);
  const [dureeTravauxMalraux, setDureeTravauxMalraux] = useState(3);

  const [showComparison, setShowComparison] = useState(false);
  const [showProjection, setShowProjection] = useState(false);
  const [showOptimizer, setShowOptimizer] = useState(false);
  const [tauxCroissancePatrimoine, setTauxCroissancePatrimoine] = useState(3);
  const [horizonTemporel, setHorizonTemporel] = useState(20);
  const [toleranceRisque, setToleranceRisque] = useState(5);

  const [showMonteCarloSimulation, setShowMonteCarloSimulation] = useState(false);
  const [showAIOptimizer, setShowAIOptimizer] = useState(false);
  const [showScenarioBuilder, setShowScenarioBuilder] = useState(false);
  const [showPredictiveAnalytics, setShowPredictiveAnalytics] = useState(false);
  const [showCashFlowWaterfall, setShowCashFlowWaterfall] = useState(false);
  const [showBenchmarking, setShowBenchmarking] = useState(false);
  
  const [nbSimulations, setNbSimulations] = useState(1000);
  const [volatiliteMarche, setVolatiliteMarche] = useState(15);
  const [tauxCroissanceMoyen, setTauxCroissanceMoyen] = useState(3);
  
  const [scenarioInflation, setScenarioInflation] = useState(2);
  const [scenarioTauxInteret, setScenarioTauxInteret] = useState(3.5);
  const [scenarioEvolutionFiscale, setScenarioEvolutionFiscale] = useState(0);
  const [scenarioVacanceLocative, setScenarioVacanceLocative] = useState(5);
  const [scenarioAugmentationLoyers, setScenarioAugmentationLoyers] = useState(2);
  const [scenarioTravaux, setScenarioTravaux] = useState(1);
  const [scenarioPlusValue, setScenarioPlusValue] = useState(20);

  const calculatePinel = () => {
    const loyerAnnuel = (loyerMensuelPinel || 0) * 12;
    const plafondsPinel: { [key: string]: number } = {
      'A-bis': 18.25,
      'A': 13.56,
      'B1': 10.93,
      'B2': 9.50
    };
    
    const plafondLoyer = plafondsPinel[zonePinel] || 10.93;
    const loyerMaxMensuel = (plafondLoyer * (surfacePinel || 0) * 0.7) + (19 * 0.3);
    const loyerMaxAnnuel = loyerMaxMensuel * 12;
    const loyerReelAnnuel = Math.min(loyerAnnuel, loyerMaxAnnuel);
    
    const plafondInvestissement = Math.min((prixAchatPinel || 0), 300000);
    const prixM2 = (prixAchatPinel || 0) / (surfacePinel || 1);
    const plafondM2 = 5500;
    const montantEligible = Math.min(plafondInvestissement, (surfacePinel || 0) * plafondM2);
    
    let tauxReduction = 0;
    if (typePinel === 'pinel-plus') {
      if (dureePinel === 6) tauxReduction = 12;
      else if (dureePinel === 9) tauxReduction = 18;
      else if (dureePinel === 12) tauxReduction = 21;
    } else {
      if (dureePinel === 6) tauxReduction = 10.5;
      else if (dureePinel === 9) tauxReduction = 15;
      else if (dureePinel === 12) tauxReduction = 17.5;
    }
    
    const reductionTotale = montantEligible * (tauxReduction / 100);
    const reductionAnnuelle = reductionTotale / (dureePinel || 1);
    
    const chargesAnnuelles = (prixAchatPinel || 0) * 0.015;
    const TMI = 0.30;
    const prelevementsSociaux = 0.172;
    const impotAnnuel = Math.max(0, loyerReelAnnuel - chargesAnnuelles) * (TMI + prelevementsSociaux);
    
    const cashFlowAnnuel = loyerReelAnnuel - chargesAnnuelles - impotAnnuel + reductionAnnuelle;
    const cashFlowTotal = cashFlowAnnuel * (dureePinel || 1);
    
    const valeurFinale = (prixAchatPinel || 0) * 1.15;
    const gainTotal = cashFlowTotal + valeurFinale - (prixAchatPinel || 0);
    const rendementGlobal = (prixAchatPinel || 0) > 0 ? (gainTotal / (prixAchatPinel || 1)) * 100 : 0;
    
    return {
      loyerMaxMensuel: loyerMaxMensuel || 0,
      loyerReelAnnuel: loyerReelAnnuel || 0,
      montantEligible: montantEligible || 0,
      tauxReduction: tauxReduction || 0,
      reductionTotale: reductionTotale || 0,
      reductionAnnuelle: reductionAnnuelle || 0,
      impotAnnuel: impotAnnuel || 0,
      cashFlowAnnuel: cashFlowAnnuel || 0,
      cashFlowTotal: cashFlowTotal || 0,
      valeurFinale: valeurFinale || 0,
      gainTotal: gainTotal || 0,
      rendementGlobal: rendementGlobal || 0
    };
  };

  const calculateMalraux = () => {
    const plafondTravaux = Math.min((montantTravauxMalraux || 0), 400000);
    const reductionTotale = plafondTravaux * ((tauxReductionMalraux || 0) / 100);
    const reductionAnnuelle = reductionTotale / (dureeTravauxMalraux || 1);
    
    const loyerAnnuel = (loyerMensuelMalraux || 0) * 12;
    const chargesAnnuelles = ((prixAchatMalraux || 0) + (montantTravauxMalraux || 0)) * 0.02;
    const revenusFonciers = loyerAnnuel - chargesAnnuelles;
    
    const TMI = 0.41;
    const prelevementsSociaux = 0.172;
    const impotAnnuel = Math.max(0, revenusFonciers) * (TMI + prelevementsSociaux);
    
    const cashFlowPendantTravaux = -(montantTravauxMalraux || 0) / (dureeTravauxMalraux || 1) + reductionAnnuelle;
    const cashFlowApresTravaux = loyerAnnuel - chargesAnnuelles - impotAnnuel;
    
    const investissementTotal = (prixAchatMalraux || 0) + (montantTravauxMalraux || 0);
    const plusValuePotentielle = investissementTotal * 0.30;
    const valeurFinale = investissementTotal + plusValuePotentielle;
    
    const economieImpotTotale = reductionTotale;
    const gainTotal = economieImpotTotale + (cashFlowApresTravaux * 10) + plusValuePotentielle;
    const rendementGlobal = investissementTotal > 0 ? (gainTotal / investissementTotal) * 100 : 0;
    
    return {
      plafondTravaux: plafondTravaux || 0,
      reductionTotale: reductionTotale || 0,
      reductionAnnuelle: reductionAnnuelle || 0,
      loyerAnnuel: loyerAnnuel || 0,
      impotAnnuel: impotAnnuel || 0,
      cashFlowPendantTravaux: cashFlowPendantTravaux || 0,
      cashFlowApresTravaux: cashFlowApresTravaux || 0,
      investissementTotal: investissementTotal || 0,
      valeurFinale: valeurFinale || 0,
      plusValuePotentielle: plusValuePotentielle || 0,
      economieImpotTotale: economieImpotTotale || 0,
      gainTotal: gainTotal || 0,
      rendementGlobal: rendementGlobal || 0
    };
  };

  const pinelResult = calculatePinel();
  const malrauxResult = calculateMalraux();

  const calculateMonteCarloSimulation = () => {
    const simulations = [];
    const investissement = immobilierSubTab === 'pinel' ? prixAchatPinel : prixAchatMalraux + montantTravauxMalraux;
    
    for (let sim = 0; sim < nbSimulations; sim++) {
      let valeurActuelle = investissement;
      const rendements = [];
      
      for (let annee = 1; annee <= 20; annee++) {
        const randomFactor = (Math.random() - 0.5) * 2;
        const volatilite = (volatiliteMarche / 100) * randomFactor;
        const croissance = (tauxCroissanceMoyen / 100) + volatilite;
        
        valeurActuelle *= (1 + croissance);
        
        if (annee === 5 || annee === 10 || annee === 15 || annee === 20) {
          rendements.push({
            annee,
            valeur: valeurActuelle,
            rendement: ((valeurActuelle - investissement) / investissement) * 100
          });
        }
      }
      
      simulations.push({
        id: sim,
        rendements,
        valeurFinale: valeurActuelle,
        rendementTotal: ((valeurActuelle - investissement) / investissement) * 100
      });
    }
    
    const valeursFin = simulations.map(s => s.valeurFinale).sort((a, b) => a - b);
    const p10 = valeursFin[Math.floor(nbSimulations * 0.1)];
    const p25 = valeursFin[Math.floor(nbSimulations * 0.25)];
    const p50 = valeursFin[Math.floor(nbSimulations * 0.5)];
    const p75 = valeursFin[Math.floor(nbSimulations * 0.75)];
    const p90 = valeursFin[Math.floor(nbSimulations * 0.9)];
    const moyenne = valeursFin.reduce((a, b) => a + b, 0) / nbSimulations;
    
    const distribution = [
      { tranche: 'Perte > 20%', count: valeursFin.filter(v => v < investissement * 0.8).length },
      { tranche: 'Perte 0-20%', count: valeursFin.filter(v => v >= investissement * 0.8 && v < investissement).length },
      { tranche: 'Gain 0-20%', count: valeursFin.filter(v => v >= investissement && v < investissement * 1.2).length },
      { tranche: 'Gain 20-50%', count: valeursFin.filter(v => v >= investissement * 1.2 && v < investissement * 1.5).length },
      { tranche: 'Gain 50-100%', count: valeursFin.filter(v => v >= investissement * 1.5 && v < investissement * 2).length },
      { tranche: 'Gain > 100%', count: valeursFin.filter(v => v >= investissement * 2).length }
    ];
    
    return {
      simulations,
      percentiles: { p10, p25, p50, p75, p90, moyenne },
      distribution,
      probabiliteGain: (valeursFin.filter(v => v > investissement).length / nbSimulations) * 100,
      probabilitePerte: (valeursFin.filter(v => v < investissement).length / nbSimulations) * 100
    };
  };

  const calculateAIOptimization = () => {
    const scenarios = [];
    
    for (let i = 0; i < 50; i++) {
      const duree = 6 + (i % 3) * 3;
      const zone = ['A-bis', 'A', 'B1'][i % 3];
      const type = i % 2 === 0 ? 'pinel-plus' : 'pinel';
      const surface = 30 + Math.floor(i / 5) * 10;
      const prix = 200000 + i * 5000;
      
      const scoreRendement = (duree / 12) * 30;
      const scoreZone = zone === 'A-bis' ? 25 : zone === 'A' ? 20 : 15;
      const scoreType = type === 'pinel-plus' ? 20 : 15;
      const scoreSurface = surface >= 40 && surface <= 60 ? 15 : 10;
      const scorePrix = prix <= 250000 ? 10 : 5;
      
      const scoreTotal = scoreRendement + scoreZone + scoreType + scoreSurface + scorePrix;
      
      const montantEligible = Math.min(prix, 300000, surface * 5500);
      const taux = type === 'pinel-plus' ? (duree === 6 ? 12 : duree === 9 ? 18 : 21) : (duree === 6 ? 10.5 : duree === 9 ? 15 : 17.5);
      const reduction = montantEligible * (taux / 100);
      const loyerAnnuel = surface * (zone === 'A-bis' ? 18.25 : zone === 'A' ? 13.56 : 10.93) * 12 * 0.85;
      const cashFlow = loyerAnnuel - (prix * 0.015) - (loyerAnnuel * 0.472) + (reduction / duree);
      const rendement = (cashFlow * duree + prix * 0.15) / prix * 100;
      
      scenarios.push({
        id: i + 1,
        duree,
        zone,
        type,
        surface,
        prix,
        reduction,
        cashFlow,
        rendement,
        scoreTotal,
        scoreRendement,
        scoreZone,
        scoreType,
        scoreSurface,
        scorePrix,
        recommandation: scoreTotal >= 85 ? 'Excellent' : scoreTotal >= 70 ? 'Très bon' : scoreTotal >= 60 ? 'Bon' : 'Moyen'
      });
    }
    
    return scenarios.sort((a, b) => b.scoreTotal - a.scoreTotal);
  };

  const calculatePredictiveAnalytics = () => {
    const predictions = [];
    const anneeActuelle = 2024;
    
    for (let annee = anneeActuelle; annee <= anneeActuelle + 10; annee++) {
      const probabiliteReduction = Math.max(0, 100 - (annee - anneeActuelle) * 8);
      const probabiliteMaintien = 60 - (annee - anneeActuelle) * 5;
      const probabiliteAugmentation = 100 - probabiliteReduction - probabiliteMaintien;
      
      const tauxPinelPredit = 17.5 * (1 - (annee - anneeActuelle) * 0.05);
      const tauxMalrauxPredit = 30 * (1 - (annee - anneeActuelle) * 0.03);
      
      const plafondPinelPredit = 300000 * (1 + (annee - anneeActuelle) * 0.02);
      const plafondMalrauxPredit = 400000 * (1 + (annee - anneeActuelle) * 0.015);
      
      const impactEconomie = -((annee - anneeActuelle) * 5000);
      
      predictions.push({
        annee,
        probabiliteReduction,
        probabiliteMaintien,
        probabiliteAugmentation,
        tauxPinelPredit,
        tauxMalrauxPredit,
        plafondPinelPredit,
        plafondMalrauxPredit,
        impactEconomie,
        confiance: Math.max(20, 95 - (annee - anneeActuelle) * 8)
      });
    }
    
    return predictions;
  };

  const calculateCashFlowWaterfall = () => {
    const isPinel = immobilierSubTab === 'pinel';
    const investissement = isPinel ? prixAchatPinel : prixAchatMalraux + montantTravauxMalraux;
    
    const waterfall = [
      { categorie: 'Investissement initial', montant: -investissement, cumul: -investissement },
      { categorie: 'Loyers perçus (20 ans)', montant: isPinel ? loyerMensuelPinel * 12 * 20 : loyerMensuelMalraux * 12 * 17, cumul: 0 },
      { categorie: 'Charges et taxes', montant: -(investissement * 0.015 * 20), cumul: 0 },
      { categorie: 'Impôts sur revenus', montant: isPinel ? -(loyerMensuelPinel * 12 * 20 * 0.3) : -(loyerMensuelMalraux * 12 * 17 * 0.41), cumul: 0 },
      { categorie: 'Réductions d\'impôt', montant: isPinel ? pinelResult.reductionTotale : malrauxResult.reductionTotale, cumul: 0 },
      { categorie: 'Plus-value à la revente', montant: investissement * (isPinel ? 0.15 : 0.30), cumul: 0 },
      { categorie: 'Impôt sur plus-value', montant: -(investissement * (isPinel ? 0.15 : 0.30) * 0.19), cumul: 0 }
    ];
    
    let cumul = 0;
    waterfall.forEach(item => {
      cumul += item.montant;
      item.cumul = cumul;
    });
    
    return waterfall;
  };

  const calculateBenchmarking = () => {
    const isPinel = immobilierSubTab === 'pinel';
    const votreRendement = isPinel ? pinelResult.rendementGlobal : malrauxResult.rendementGlobal;
    
    return {
      votreInvestissement: {
        rendement: votreRendement,
        reduction: isPinel ? pinelResult.reductionTotale : malrauxResult.reductionTotale,
        cashFlow: isPinel ? pinelResult.cashFlowTotal : malrauxResult.cashFlowApresTravaux * 10,
        risque: isPinel ? 4 : 6
      },
      moyenneMarche: {
        rendement: isPinel ? 3.5 : 5.2,
        reduction: isPinel ? 45000 : 85000,
        cashFlow: isPinel ? 80000 : 120000,
        risque: 5
      },
      top10Pourcent: {
        rendement: isPinel ? 6.5 : 9.8,
        reduction: isPinel ? 52500 : 120000,
        cashFlow: isPinel ? 120000 : 180000,
        risque: 6
      },
      comparaisons: [
        { critere: 'Rendement global', votre: votreRendement, marche: isPinel ? 3.5 : 5.2, top10: isPinel ? 6.5 : 9.8 },
        { critere: 'Réduction d\'impôt', votre: isPinel ? pinelResult.reductionTotale : malrauxResult.reductionTotale, marche: isPinel ? 45000 : 85000, top10: isPinel ? 52500 : 120000 },
        { critere: 'Cash-flow cumulé', votre: isPinel ? pinelResult.cashFlowTotal : malrauxResult.cashFlowApresTravaux * 10, marche: isPinel ? 80000 : 120000, top10: isPinel ? 120000 : 180000 },
        { critere: 'Niveau de risque', votre: isPinel ? 4 : 6, marche: 5, top10: 6 }
      ],
      classement: votreRendement > (isPinel ? 6.5 : 9.8) ? 'Top 10%' : votreRendement > (isPinel ? 3.5 : 5.2) ? 'Au-dessus de la moyenne' : 'En-dessous de la moyenne'
    };
  };

  const monteCarloData = showMonteCarloSimulation ? calculateMonteCarloSimulation() : null;
  const aiOptimizationData = showAIOptimizer ? calculateAIOptimization() : null;
  const predictiveData = showPredictiveAnalytics ? calculatePredictiveAnalytics() : null;
  const waterfallData = showCashFlowWaterfall ? calculateCashFlowWaterfall() : null;
  const benchmarkingData = showBenchmarking ? calculateBenchmarking() : null;

  const calculateSuccession = () => {
    const abattements: { [key: string]: number } = {
      'enfant': 100000,
      'petit-enfant': 31865,
      'conjoint': 80724,
      'frere-soeur': 15932,
      'neveu-niece': 7967,
      'autre': 0
    };

    const abattement = abattements[lienParente] || 0;
    const partParBeneficiaire = patrimoine / nombreBeneficiaires;
    const donationsDeduites = donationsAnterieures / nombreBeneficiaires;
    const abattementRestant = Math.max(0, abattement - donationsDeduites);
    const assietteTaxable = Math.max(0, partParBeneficiaire - abattementRestant);

    let droits = 0;
    let reste = assietteTaxable;

    const bareme: { [key: string]: Array<[number, number]> } = {
      'enfant': [
        [8072, 0.05],
        [4037, 0.10],
        [3823, 0.15],
        [536392, 0.20],
        [350514, 0.30],
        [902838, 0.40],
        [Infinity, 0.45]
      ],
      'conjoint': [[Infinity, 0]],
      'frere-soeur': [
        [24430, 0.35],
        [Infinity, 0.45]
      ],
      'neveu-niece': [[Infinity, 0.55]],
      'petit-enfant': [
        [8072, 0.05],
        [4037, 0.10],
        [3823, 0.15],
        [536392, 0.20],
        [350514, 0.30],
        [902838, 0.40],
        [Infinity, 0.45]
      ],
      'autre': [[Infinity, 0.60]]
    };

    const tranchesApplicables = bareme[lienParente] || bareme['autre'];

    for (const [largeurTranche, taux] of tranchesApplicables) {
      const montantTranche = Math.min(reste, largeurTranche);
      if (montantTranche <= 0) break;
      droits += montantTranche * taux;
      reste -= montantTranche;
      if (reste <= 0) break;
    }

    const droitsTotaux = droits * nombreBeneficiaires;

    return {
      partBrute: partParBeneficiaire,
      abattement: abattementRestant,
      assietteTaxable,
      droits: droitsTotaux,
      tauxMoyen: assietteTaxable > 0 ? (droits / assietteTaxable) * 100 : 0,
      netTransmis: patrimoine - droitsTotaux
    };
  };

  const successionResult = calculateSuccession();

  const calculateProjectionSuccession = () => {
    const projections = [];
    for (let annee = 0; annee <= horizonTemporel; annee++) {
      const patrimoineProjecte = patrimoine * Math.pow(1 + tauxCroissancePatrimoine / 100, annee);
      const abattement = lienParente === 'enfant' ? 100000 : lienParente === 'petit-enfant' ? 31865 : 0;
      const partParBenef = patrimoineProjecte / nombreBeneficiaires;
      const assietteTaxable = Math.max(0, partParBenef - abattement);
      
      let droits = 0;
      let reste = assietteTaxable;
      const tranches: Array<[number, number]> = [
        [8072, 0.05], [4037, 0.10], [3823, 0.15], [536392, 0.20],
        [350514, 0.30], [902838, 0.40], [Infinity, 0.45]
      ];
      
      for (const [largeur, taux] of tranches) {
        const montant = Math.min(reste, largeur);
        if (montant <= 0) break;
        droits += montant * taux;
        reste -= montant;
        if (reste <= 0) break;
      }
      
      const droitsTotaux = droits * nombreBeneficiaires;
      
      projections.push({
        annee,
        patrimoine: patrimoineProjecte,
        droits: droitsTotaux,
        netTransmis: patrimoineProjecte - droitsTotaux,
        tauxImposition: patrimoineProjecte > 0 ? (droitsTotaux / patrimoineProjecte) * 100 : 0
      });
    }
    return projections;
  };

  const projectionData = calculateProjectionSuccession();

  const calculateMultiStrategyComparison = () => {
    const strategies = [];
    
    const sansOptim = {
      nom: 'Sans optimisation',
      droitsImmédiats: successionResult.droits,
      droitsFuturs: successionResult.droits * 1.5,
      economie: 0,
      complexite: 1,
      delai: 0,
      risque: 1,
      flexibilite: 10,
      score: 3
    };
    strategies.push(sansOptim);
    
    const nbDonations = Math.floor(horizonTemporel / 15);
    const economieDonat = successionResult.droits * 0.40 * nbDonations;
    strategies.push({
      nom: 'Donations régulières',
      droitsImmédiats: successionResult.droits * 0.15,
      droitsFuturs: successionResult.droits * 0.60,
      economie: economieDonat,
      complexite: 3,
      delai: 1,
      risque: 2,
      flexibilite: 7,
      score: 7.5
    });
    
    const tauxUsufruit = ageUsufuitier < 61 ? 50 : ageUsufuitier < 71 ? 40 : 30;
    const economieDemo = successionResult.droits * (tauxUsufruit / 100);
    strategies.push({
      nom: 'Démembrement',
      droitsImmédiats: successionResult.droits * (1 - tauxUsufruit / 100),
      droitsFuturs: 0,
      economie: economieDemo,
      complexite: 5,
      delai: 2,
      risque: 3,
      flexibilite: 4,
      score: 8
    });
    
    const economieAV = successionResult.droits * 0.65;
    strategies.push({
      nom: 'Assurance-vie',
      droitsImmédiats: 0,
      droitsFuturs: successionResult.droits * 0.35,
      economie: economieAV,
      complexite: 4,
      delai: 3,
      risque: 2,
      flexibilite: 8,
      score: 8.5
    });
    
    const economieSCI = successionResult.droits * 0.75;
    strategies.push({
      nom: 'SCI + Démembrement',
      droitsImmédiats: successionResult.droits * 0.20,
      droitsFuturs: successionResult.droits * 0.05,
      economie: economieSCI,
      complexite: 8,
      delai: 6,
      risque: 4,
      flexibilite: 5,
      score: 9
    });
    
    const economieMixte = successionResult.droits * 0.85;
    strategies.push({
      nom: 'Stratégie mixte optimale',
      droitsImmédiats: successionResult.droits * 0.10,
      droitsFuturs: successionResult.droits * 0.05,
      economie: economieMixte,
      complexite: 9,
      delai: 12,
      risque: 5,
      flexibilite: 6,
      score: 9.5
    });
    
    return strategies;
  };

  const strategiesComparison = calculateMultiStrategyComparison();

  const calculateRiskAnalysis = () => {
    return [
      {
        facteur: 'Évolution législative',
        impact: 7,
        probabilite: 6,
        mitigation: 'Diversification des stratégies'
      },
      {
        facteur: 'Changement situation familiale',
        impact: 8,
        probabilite: 5,
        mitigation: 'Clauses de révocabilité'
      },
      {
        facteur: 'Valorisation patrimoine',
        impact: 6,
        probabilite: 7,
        mitigation: 'Réévaluation régulière'
      },
      {
        facteur: 'Liquidité insuffisante',
        impact: 9,
        probabilite: 4,
        mitigation: 'Assurance décès'
      },
      {
        facteur: 'Contestation héritiers',
        impact: 8,
        probabilite: 3,
        mitigation: 'Donation-partage notariée'
      }
    ];
  };

  const riskAnalysis = calculateRiskAnalysis();

  const calculateOptimalStrategy = () => {
    const score = (economie: number, complexite: number, delai: number, risque: number) => {
      return (economie / successionResult.droits) * 40 - complexite * 2 - delai * 1.5 - risque * 3 + toleranceRisque * 2;
    };
    
    const strategies = calculateMultiStrategyComparison();
    const scored = strategies.map(s => ({
      ...s,
      scoreOptimise: score(s.economie, s.complexite, s.delai, s.risque)
    }));
    
    return scored.sort((a, b) => b.scoreOptimise - a.scoreOptimise);
  };

  const optimalStrategies = calculateOptimalStrategy();

  const calculateDemembrement = () => {
    const baremeUsufruit: { [key: number]: number } = {
      20: 90, 30: 80, 40: 70, 50: 60, 60: 50, 70: 40, 80: 30, 90: 20, 91: 10
    };

    let tauxUsufruit = 0;
    if (dureeUsufruit > 0) {
      tauxUsufruit = Math.min(dureeUsufruit, 10) * 10;
    } else {
      const ageKey = Math.min(91, Math.max(20, Math.floor((ageUsufuitier - 1) / 10) * 10 + 10));
      tauxUsufruit = baremeUsufruit[ageKey] || 10;
    }

    const valeurUsufruit = valeurBien * (tauxUsufruit / 100);
    const valeurNuePropriete = valeurBien - valeurUsufruit;
    
    const abattement = lienParente === 'enfant' ? 100000 : lienParente === 'petit-enfant' ? 31865 : 0;
    const baseImposableNP = Math.max(0, valeurNuePropriete - abattement);
    
    let droitsNP = 0;
    let resteNP = baseImposableNP;
    const tranches: Array<[number, number]> = [
      [8072, 0.05],
      [4037, 0.10],
      [3823, 0.15],
      [536392, 0.20],
      [350514, 0.30],
      [902838, 0.40],
      [Infinity, 0.45]
    ];
    
    for (const [largeur, taux] of tranches) {
      const montant = Math.min(resteNP, largeur);
      if (montant <= 0) break;
      droitsNP += montant * taux;
      resteNP -= montant;
      if (resteNP <= 0) break;
    }
    
    const baseImposablePP = Math.max(0, valeurBien - abattement);
    let droitsPP = 0;
    let restePP = baseImposablePP;
    
    for (const [largeur, taux] of tranches) {
      const montant = Math.min(restePP, largeur);
      if (montant <= 0) break;
      droitsPP += montant * taux;
      restePP -= montant;
      if (restePP <= 0) break;
    }
    
    const economieImmediateNP = droitsPP - droitsNP;
    const economieSuccession = valeurUsufruit;

    return {
      tauxUsufruit,
      valeurUsufruit,
      valeurNuePropriete,
      economieImmediateNP,
      economieSuccession,
      economieGlobale: economieImmediateNP + economieSuccession
    };
  };

  const dembrementResult = calculateDemembrement();

  const calculateDonation = () => {
    const abattement = lienParente === 'enfant' ? 100000 : lienParente === 'petit-enfant' ? 31865 : 0;
    const montantTaxable = Math.max(0, montantDonation - abattement);
    
    let droitsDonation = 0;
    let reste = montantTaxable;
    const tranches: Array<[number, number]> = [
      [8072, 0.05],
      [4037, 0.10],
      [3823, 0.15],
      [536392, 0.20],
      [350514, 0.30],
      [902838, 0.40],
      [Infinity, 0.45]
    ];
    
    for (const [largeurTranche, taux] of tranches) {
      const montantTranche = Math.min(reste, largeurTranche);
      if (montantTranche <= 0) break;
      droitsDonation += montantTranche * taux;
      reste -= montantTranche;
      if (reste <= 0) break;
    }

    const nombreDonations = Math.floor(30 / frequenceDonation);
    const totalDonne = montantDonation * nombreDonations;
    const totalDroits = droitsDonation * nombreDonations;
    
    const baseImposableSuccession = Math.max(0, totalDonne - abattement);
    let droitsSuccessionSansDonation = 0;
    let resteSucc = baseImposableSuccession;
    
    for (const [largeur, taux] of tranches) {
      const montant = Math.min(resteSucc, largeur);
      if (montant <= 0) break;
      droitsSuccessionSansDonation += montant * taux;
      resteSucc -= montant;
      if (resteSucc <= 0) break;
    }
    
    const economie = droitsSuccessionSansDonation - totalDroits;

    return {
      droitsDonation,
      nombreDonations,
      totalDonne,
      totalDroits,
      economie,
      tauxEconomie: droitsSuccessionSansDonation > 0 ? (economie / droitsSuccessionSansDonation) * 100 : 0
    };
  };

  const donationResult = calculateDonation();

  const calculateAssuranceVie = () => {
    const versementsAvant70 = capitalAssuranceVie - versementsApres70;
    
    const abattementAvant70ParBenef = 152500;
    const abattementTotalAvant70 = abattementAvant70ParBenef * nombreBeneficiaires;
    const taxableAvant70 = Math.max(0, versementsAvant70 - abattementTotalAvant70);
    const droitsAvant70 = taxableAvant70 <= 700000 ? taxableAvant70 * 0.20 : (700000 * 0.20) + ((taxableAvant70 - 700000) * 0.3125);
    
    const abattementApres70 = 30500;
    const taxableApres70 = Math.max(0, versementsApres70 - abattementApres70);
    
    let droitsApres70 = 0;
    let resteApres70 = taxableApres70 / nombreBeneficiaires;
    const tranchesSuccession: Array<[number, number]> = [
      [8072, 0.05],
      [4037, 0.10],
      [3823, 0.15],
      [536392, 0.20],
      [350514, 0.30],
      [902838, 0.40],
      [Infinity, 0.45]
    ];
    
    for (const [largeurTranche, taux] of tranchesSuccession) {
      const montantTranche = Math.min(resteApres70, largeurTranche);
      if (montantTranche <= 0) break;
      droitsApres70 += montantTranche * taux;
      resteApres70 -= montantTranche;
      if (resteApres70 <= 0) break;
    }
    droitsApres70 *= nombreBeneficiaires;
    
    const droitsTotal = droitsAvant70 + droitsApres70;
    
    const abattementEnfant = lienParente === 'enfant' ? 100000 : 31865;
    const baseImposableClassique = Math.max(0, (capitalAssuranceVie / nombreBeneficiaires) - abattementEnfant);
    let droitsSuccessionClassique = 0;
    let resteClassique = baseImposableClassique;
    
    for (const [largeurTranche, taux] of tranchesSuccession) {
      const montantTranche = Math.min(resteClassique, largeurTranche);
      if (montantTranche <= 0) break;
      droitsSuccessionClassique += montantTranche * taux;
      resteClassique -= montantTranche;
      if (resteClassique <= 0) break;
    }
    droitsSuccessionClassique *= nombreBeneficiaires;
    
    const economie = droitsSuccessionClassique - droitsTotal;

    return {
      versementsAvant70,
      versementsApres70,
      droitsAvant70,
      droitsApres70,
      droitsTotal,
      economie,
      tauxEconomie: droitsSuccessionClassique > 0 ? (economie / droitsSuccessionClassique) * 100 : 0
    };
  };

  const assuranceVieResult = calculateAssuranceVie();

  const calculateSCI = () => {
    const resultatNet = (revenusLocatifs || 0) - (chargesSCI || 0);
    const impotSociete = 0;
    const resultatApresIS = resultatNet - impotSociete;
    
    const valeurPart = (capitalSCI || 0) / (nombreParts || 1);
    const decoteDonation = 0.10;
    const valeurPartDecotee = valeurPart * (1 - decoteDonation);
    
    const donationParts = 100;
    const valeurDonation = donationParts * valeurPartDecotee;
    const abattement = lienParente === 'enfant' ? 100000 : 31865;
    const baseImposable = Math.max(0, valeurDonation - abattement);
    
    let droitsDonation = 0;
    let reste = baseImposable;
    const tranches: Array<[number, number]> = [
      [8072, 0.05],
      [4037, 0.10],
      [3823, 0.15],
      [536392, 0.20],
      [350514, 0.30],
      [902838, 0.40],
      [Infinity, 0.45]
    ];
    
    for (const [largeur, taux] of tranches) {
      const montant = Math.min(reste, largeur);
      if (montant <= 0) break;
      droitsDonation += montant * taux;
      reste -= montant;
      if (reste <= 0) break;
    }
    
    const valeurSansDecote = donationParts * valeurPart;
    const baseImposableSansDecote = Math.max(0, valeurSansDecote - abattement);
    let droitsSansDecote = 0;
    let resteSansDecote = baseImposableSansDecote;
    
    for (const [largeur, taux] of tranches) {
      const montant = Math.min(resteSansDecote, largeur);
      if (montant <= 0) break;
      droitsSansDecote += montant * taux;
      resteSansDecote -= montant;
      if (resteSansDecote <= 0) break;
    }
    
    const economieDecote = droitsSansDecote - droitsDonation;

    return {
      resultatNet: resultatNet || 0,
      resultatApresIS: resultatApresIS || 0,
      valeurPart: valeurPart || 0,
      valeurPartDecotee: valeurPartDecotee || 0,
      economieDecote: economieDecote || 0,
      rendementNet: (capitalSCI || 0) > 0 ? ((resultatApresIS || 0) / (capitalSCI || 1)) * 100 : 0
    };
  };

  const sciResult = calculateSCI();

  const calculateLMNP = () => {
    const loyerAnnuel = (loyerMensuel || 0) * 12;
    const revenuBrut = loyerAnnuel;
    const revenuNet = revenuBrut - (chargesAnnuelles || 0);
    
    const amortissementAnnuel = (prixAchatLMNP || 0) / (dureeAmortissement || 1);
    const resultatFiscal = Math.max(0, revenuNet - amortissementAnnuel);
    
    const TMI = 0.30;
    const prelevementsSociaux = 0.172;
    const tauxGlobal = TMI + prelevementsSociaux;
    
    const impotReel = resultatFiscal * tauxGlobal;
    const impotMicroBIC = (revenuBrut * 0.50) * tauxGlobal;
    const economieImpot = impotMicroBIC - impotReel;
    
    const cashFlowNet = revenuNet - impotReel;
    const rentabiliteNette = (prixAchatLMNP || 0) > 0 ? (cashFlowNet / (prixAchatLMNP || 1)) * 100 : 0;

    return {
      revenuBrut: revenuBrut || 0,
      revenuNet: revenuNet || 0,
      amortissementAnnuel: amortissementAnnuel || 0,
      resultatFiscal: resultatFiscal || 0,
      impotReel: impotReel || 0,
      economieImpot: economieImpot || 0,
      cashFlowNet: cashFlowNet || 0,
      rentabiliteNette: rentabiliteNette || 0,
      impotMicroBIC: impotMicroBIC || 0
    };
  };

  const lmnpResult = calculateLMNP();

  const optimisationData = [
    { strategie: 'Sans optimisation', droits: patrimoineTotal * 0.20, netTransmis: patrimoineTotal * 0.80 },
    { strategie: 'Donations régulières', droits: patrimoineTotal * 0.12, netTransmis: patrimoineTotal * 0.88 },
    { strategie: 'Démembrement', droits: patrimoineTotal * 0.10, netTransmis: patrimoineTotal * 0.90 },
    { strategie: 'Assurance-vie', droits: patrimoineTotal * 0.08, netTransmis: patrimoineTotal * 0.92 },
    { strategie: 'Stratégie mixte', droits: patrimoineTotal * 0.05, netTransmis: patrimoineTotal * 0.95 }
  ];

  const evolutionPatrimoine = Array.from({ length: 31 }, (_, i) => ({
    annee: i,
    sansOptimisation: patrimoineTotal * Math.pow(1.03, i),
    avecDonations: patrimoineTotal * Math.pow(1.03, i) * (1 - (i * 0.01)),
    avecDemembrement: patrimoineTotal * Math.pow(1.03, i) * (1 - (i * 0.008)),
    strategieMixte: patrimoineTotal * Math.pow(1.03, i) * (1 - (i * 0.005))
  }));

  const repartitionPatrimoine = [
    { name: 'Immobilier', value: patrimoineTotal * 0.45 },
    { name: 'Valeurs mobilières', value: patrimoineTotal * 0.30 },
    { name: 'Assurance-vie', value: patrimoineTotal * 0.15 },
    { name: 'Liquidités', value: patrimoineTotal * 0.10 }
  ];

  const impactFiscalStrategies = [
    { strategie: 'Donation simple', economie: 45000, complexite: 2, delai: 1 },
    { strategie: 'Démembrement', economie: 65000, complexite: 4, delai: 3 },
    { strategie: 'SCI familiale', economie: 55000, complexite: 5, delai: 6 },
    { strategie: 'Assurance-vie', economie: 70000, complexite: 3, delai: 2 },
    { strategie: 'Pacte Dutreil', economie: 150000, complexite: 8, delai: 12 }
  ];

  const radarData = [
    { critere: 'Économie fiscale', valeur: 85 },
    { critere: 'Simplicité', valeur: 60 },
    { critere: 'Rapidité', valeur: 70 },
    { critere: 'Flexibilité', valeur: 75 },
    { critere: 'Sécurité juridique', valeur: 90 }
  ];

  const renderSuccessionContent = () => {
    switch (successionSubTab) {
      case 'calcul':
        return (
          <div className="space-y-6" key="calcul-content">
            {/* Boutons d'actions avancées */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setShowProjection(!showProjection)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showProjection
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <i className="ri-line-chart-line mr-2"></i>
                {showProjection ? 'Masquer' : 'Afficher'} Projection Temporelle
              </button>
              <button
                onClick={() => setShowComparison(!showComparison)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showComparison
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <i className="ri-bar-chart-grouped-line mr-2"></i>
                {showComparison ? 'Masquer' : 'Afficher'} Comparaison Multi-Stratégies
              </button>
              <button
                onClick={() => setShowOptimizer(!showOptimizer)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showOptimizer
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <i className="ri-magic-line mr-2"></i>
                {showOptimizer ? 'Masquer' : 'Afficher'} Optimiseur Intelligent
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-calculator-line mr-2"></i>
                  Paramètres de calcul
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Patrimoine à transmettre</label>
                    <input
                      type="number"
                      value={patrimoine}
                      onChange={(e) => setPatrimoine(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Lien de parenté</label>
                    <select
                      value={lienParente}
                      onChange={(e) => setLienParente(e.target.value)}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 pr-8 text-amber-100 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="enfant">Enfant</option>
                      <option value="petit-enfant">Petit-enfant</option>
                      <option value="conjoint">Conjoint/PACS</option>
                      <option value="frere-soeur">Frère/Sœur</option>
                      <option value="neveu-niece">Neveu/Nièce</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Nombre de bénéficiaires</label>
                    <input
                      type="number"
                      value={nombreBeneficiaires}
                      onChange={(e) => setNombreBeneficiaires(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Donations antérieures (15 dernières années)</label>
                    <input
                      type="number"
                      value={donationsAnterieures}
                      onChange={(e) => setDonationsAnterieures(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-file-list-3-line mr-2"></i>
                  Résultats du calcul
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Part brute par bénéficiaire</div>
                    <div className="text-2xl font-bold text-amber-400">{successionResult.partBrute.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Abattement applicable</div>
                    <div className="text-2xl font-bold text-green-400">{successionResult.abattement.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Assiette taxable</div>
                    <div className="text-2xl font-bold text-amber-400">{successionResult.assietteTaxable.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Droits de succession totaux</div>
                    <div className="text-2xl font-bold text-red-400">{successionResult.droits.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Taux moyen d'imposition</div>
                    <div className="text-2xl font-bold text-amber-400">{successionResult.tauxMoyen.toFixed(2)} %</div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-2 border-amber-500 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Net transmis aux héritiers</div>
                    <div className="text-3xl font-bold text-amber-300">{successionResult.netTransmis.toLocaleString('fr-FR')} €</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projection temporelle avancée */}
            {showProjection && (
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-time-line mr-2"></i>
                  Projection Temporelle Avancée
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-amber-300 mb-2 text-sm">Taux de croissance annuel (%)</label>
                    <input
                      type="number"
                      value={tauxCroissancePatrimoine}
                      onChange={(e) => setTauxCroissancePatrimoine(Number(e.target.value))}
                      className="w-full bg-black/40 border border-amber-700 rounded px-3 py-2 text-amber-100 text-sm"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <label className="block text-amber-300 mb-2 text-sm">Horizon temporel (années)</label>
                    <input
                      type="number"
                      value={horizonTemporel}
                      onChange={(e) => setHorizonTemporel(Number(e.target.value))}
                      className="w-full bg-black/40 border border-amber-700 rounded px-3 py-2 text-amber-100 text-sm"
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded px-4 py-2 w-full">
                      <div className="text-amber-300 text-xs">Patrimoine projeté (an {horizonTemporel})</div>
                      <div className="text-amber-400 font-bold text-lg">
                        {projectionData[horizonTemporel]?.patrimoine.toLocaleString('fr-FR')} €
                      </div>
                    </div>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#8B7355" />
                    <XAxis dataKey="annee" stroke="#D4AF37" label={{ value: 'Années', position: 'insideBottom', offset: -5, fill: '#D4AF37' }} />
                    <YAxis yAxisId="left" stroke="#D4AF37" label={{ value: 'Montant (€)', angle: -90, position: 'insideLeft', fill: '#D4AF37' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#FF6B6B" label={{ value: 'Taux (%)', angle: 90, position: 'insideRight', fill: '#FF6B6B' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '2px solid #D4AF37', borderRadius: '8px' }}
                      labelStyle={{ color: '#D4AF37' }}
                      itemStyle={{ color: '#FFD700' }}
                    />
                    <Legend wrapperStyle={{ color: '#D4AF37' }} />
                    <Area yAxisId="left" type="monotone" dataKey="patrimoine" fill="#D4AF37" fillOpacity={0.3} stroke="#D4AF37" name="Patrimoine projeté" />
                    <Line yAxisId="left" type="monotone" dataKey="droits" stroke="#FF6B6B" strokeWidth={2} name="Droits de succession" />
                    <Line yAxisId="left" type="monotone" dataKey="netTransmis" stroke="#4ADE80" strokeWidth={2} name="Net transmis" />
                    <Line yAxisId="right" type="monotone" dataKey="tauxImposition" stroke="#FFA500" strokeWidth={2} strokeDasharray="5 5" name="Taux d'imposition (%)" />
                  </ComposedChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Croissance totale</div>
                    <div className="text-amber-400 font-bold">
                      +{((projectionData[horizonTemporel]?.patrimoine / patrimoine - 1) * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Droits projetés</div>
                    <div className="text-red-400 font-bold">
                      {projectionData[horizonTemporel]?.droits.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Net transmis projeté</div>
                    <div className="text-green-400 font-bold">
                      {projectionData[horizonTemporel]?.netTransmis.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Taux imposition final</div>
                    <div className="text-amber-400 font-bold">
                      {projectionData[horizonTemporel]?.tauxImposition.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Comparaison multi-stratégies */}
            {showComparison && (
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-bar-chart-grouped-line mr-2"></i>
                  Comparaison Multi-Stratégies Avancée
                </h4>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={strategiesComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#8B7355" />
                      <XAxis dataKey="nom" stroke="#D4AF37" angle={-15} textAnchor="end" height={100} />
                      <YAxis stroke="#D4AF37" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: '2px solid #D4AF37', borderRadius: '8px' }}
                        labelStyle={{ color: '#D4AF37' }}
                        itemStyle={{ color: '#FFD700' }}
                      />
                      <Legend wrapperStyle={{ color: '#D4AF37' }} />
                      <Bar dataKey="economie" fill="#4ADE80" name="Économie totale (€)" />
                      <Bar dataKey="droitsImmédiats" fill="#FF6B6B" name="Droits immédiats (€)" />
                    </BarChart>
                  </ResponsiveContainer>

                  <ResponsiveContainer width="100%" height={350}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="#8B7355" />
                      <XAxis dataKey="complexite" name="Complexité" stroke="#D4AF37" label={{ value: 'Complexité', position: 'insideBottom', offset: -5, fill: '#D4AF37' }} />
                      <YAxis dataKey="economie" name="Économie" stroke="#D4AF37" label={{ value: 'Économie (€)', angle: -90, position: 'insideLeft', fill: '#D4AF37' }} />
                      <ZAxis dataKey="score" range={[100, 1000]} name="Score" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: '2px solid #D4AF37', borderRadius: '8px' }}
                        labelStyle={{ color: '#D4AF37' }}
                        cursor={{ strokeDasharray: '3 3' }}
                      />
                      <Legend wrapperStyle={{ color: '#D4AF37' }} />
                      <Scatter name="Stratégies" data={strategiesComparison} fill="#D4AF37" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {strategiesComparison.map((strat, index) => (
                    <div key={index} className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                      <h5 className="text-lg font-bold text-amber-400 mb-3">{strat.nom}</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-amber-300">Économie</span>
                          <span className="text-green-400 font-bold">{strat.economie.toLocaleString('fr-FR')} €</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-amber-300">Droits immédiats</span>
                          <span className="text-red-400 font-bold">{strat.droitsImmédiats.toLocaleString('fr-FR')} €</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-amber-300">Complexité</span>
                          <div className="flex">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <div key={i} className={`w-2 h-4 mx-0.5 rounded ${i < strat.complexite ? 'bg-amber-500' : 'bg-amber-900/30'}`}></div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-amber-300">Délai</span>
                          <span className="text-amber-400 font-bold">{strat.delai} mois</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-amber-300">Risque</span>
                          <div className="flex">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <div key={i} className={`w-2 h-4 mx-0.5 rounded ${i < strat.risque ? 'bg-red-500' : 'bg-red-900/30'}`}></div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-amber-300">Flexibilité</span>
                          <div className="flex">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <div key={i} className={`w-2 h-4 mx-0.5 rounded ${i < strat.flexibilite ? 'bg-blue-500' : 'bg-blue-900/30'}`}></div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-amber-700">
                          <div className="flex justify-between items-center">
                            <span className="text-amber-300 font-bold">Score global</span>
                            <span className="text-amber-400 font-bold text-lg">{strat.score}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optimiseur intelligent */}
            {showOptimizer && (
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-magic-line mr-2"></i>
                  Optimiseur Intelligent - Recommandations Personnalisées
                </h4>

                <div className="mb-6">
                  <label className="block text-amber-300 mb-2 font-medium">Tolérance au risque (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={toleranceRisque}
                    onChange={(e) => setToleranceRisque(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-amber-300 text-sm mt-1">
                    <span>Prudent</span>
                    <span className="font-bold text-amber-400">{toleranceRisque}/10</span>
                    <span>Audacieux</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {optimalStrategies.slice(0, 3).map((strat, index) => (
                    <div key={index} className={`bg-gradient-to-r ${
                      index === 0 ? 'from-amber-900/40 to-amber-800/40 border-2 border-amber-500' :
                      index === 1 ? 'from-amber-900/30 to-amber-800/30 border-2 border-amber-600' :
                      'from-amber-900/20 to-amber-800/20 border border-amber-700'
                    } rounded-lg p-5`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {index === 0 && (
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
                              <i className="ri-trophy-line text-black text-xl"></i>
                            </div>
                          )}
                          {index === 1 && (
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                              <i className="ri-medal-line text-black text-xl"></i>
                            </div>
                          )}
                          {index === 2 && (
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-800 rounded-full flex items-center justify-center">
                              <i className="ri-award-line text-white text-xl"></i>
                            </div>
                          )}
                          <div>
                            <h5 className="text-lg font-bold text-amber-300">{strat.nom}</h5>
                            <p className="text-amber-400/70 text-sm">
                              {index === 0 ? '🏆 Recommandation optimale' : index === 1 ? '🥈 Excellente alternative' : '🥉 Bonne option'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-amber-300 text-sm">Score optimisé</div>
                          <div className="text-2xl font-bold text-amber-400">{strat.scoreOptimise.toFixed(1)}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Économie</div>
                          <div className="text-green-400 font-bold text-sm">{strat.economie.toLocaleString('fr-FR')} €</div>
                        </div>
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Complexité</div>
                          <div className="text-amber-400 font-bold text-sm">{strat.complexite}/10</div>
                        </div>
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Délai</div>
                          <div className="text-amber-400 font-bold text-sm">{strat.delai} mois</div>
                        </div>
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Risque</div>
                          <div className="text-amber-400 font-bold text-sm">{strat.risque}/10</div>
                        </div>
                      </div>

                      {index === 0 && (
                        <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded p-3">
                          <p className="text-amber-200 text-sm">
                            <i className="ri-lightbulb-line mr-2 text-amber-400"></i>
                            <strong>Pourquoi cette stratégie ?</strong> Elle offre le meilleur équilibre entre économie fiscale, 
                            complexité de mise en œuvre et votre profil de risque. Économie potentielle de {strat.economie.toLocaleString('fr-FR')} € 
                            avec un niveau de risque adapté à votre tolérance.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Analyse de risque */}
                <div className="mt-6 bg-black/40 border-2 border-amber-700 rounded-lg p-5">
                  <h5 className="text-lg font-bold text-amber-400 mb-4 flex items-center">
                    <i className="ri-shield-check-line mr-2"></i>
                    Analyse de Risque Détaillée
                  </h5>
                  <div className="space-y-3">
                    {riskAnalysis.map((risk, index) => (
                      <div key={index} className="bg-amber-900/20 border border-amber-700 rounded p-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-amber-300 font-medium">{risk.facteur}</span>
                          <div className="flex space-x-2">
                            <span className="text-xs text-amber-400">Impact: {risk.impact}/10</span>
                            <span className="text-xs text-amber-400">Prob: {risk.probabilite}/10</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex-1 bg-black/40 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-amber-500 to-red-500 h-2 rounded-full"
                              style={{ width: `${(risk.impact * risk.probabilite) / 10}%` }}
                            ></div>
                          </div>
                          <span className="text-amber-400 text-xs font-bold">
                            {((risk.impact * risk.probabilite) / 10).toFixed(0)}%
                          </span>
                        </div>
                        <div className="text-amber-200 text-xs">
                          <i className="ri-shield-line mr-1 text-green-400"></i>
                          Mitigation: {risk.mitigation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
              <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                <i className="ri-bar-chart-box-line mr-2"></i>
                Barème des droits de succession 2024 (ligne directe)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-amber-100">
                  <thead>
                    <tr className="border-b-2 border-amber-600">
                      <th className="text-left py-3 px-4 text-amber-300">Tranche</th>
                      <th className="text-right py-3 px-4 text-amber-300">Taux</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-amber-800">
                      <td className="py-3 px-4">Jusqu'à 8 072 €</td>
                      <td className="text-right py-3 px-4 font-bold text-amber-400">5%</td>
                    </tr>
                    <tr className="border-b border-amber-800">
                      <td className="py-3 px-4">De 8 072 € à 12 109 €</td>
                      <td className="text-right py-3 px-4 font-bold text-amber-400">10%</td>
                    </tr>
                    <tr className="border-b border-amber-800">
                      <td className="py-3 px-4">De 12 109 € à 15 932 €</td>
                      <td className="text-right py-3 px-4 font-bold text-amber-400">15%</td>
                    </tr>
                    <tr className="border-b border-amber-800">
                      <td className="py-3 px-4">De 15 932 € à 552 324 €</td>
                      <td className="text-right py-3 px-4 font-bold text-amber-400">20%</td>
                    </tr>
                    <tr className="border-b border-amber-800">
                      <td className="py-3 px-4">De 552 324 € à 902 838 €</td>
                      <td className="text-right py-3 px-4 font-bold text-amber-400">30%</td>
                    </tr>
                    <tr className="border-b border-amber-800">
                      <td className="py-3 px-4">De 902 838 € à 1 805 677 €</td>
                      <td className="text-right py-3 px-4 font-bold text-amber-400">40%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Au-delà de 1 805 677 €</td>
                      <td className="text-right py-3 px-4 font-bold text-red-400">45%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'optimisation':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-settings-3-line mr-2"></i>
                  Paramètres d'optimisation
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Votre âge</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Patrimoine total</label>
                    <input
                      type="number"
                      value={patrimoineTotal}
                      onChange={(e) => setPatrimoineTotal(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Revenus annuels</label>
                    <input
                      type="number"
                      value={revenusAnnuels}
                      onChange={(e) => setRevenusAnnuels(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Objectif de transmission</label>
                    <input
                      type="number"
                      value={objectifTransmission}
                      onChange={(e) => setObjectifTransmission(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-pie-chart-line mr-2"></i>
                  Répartition du patrimoine
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={repartitionPatrimoine}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {repartitionPatrimoine.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '2px solid #D4AF37', borderRadius: '8px' }}
                      labelStyle={{ color: '#D4AF37' }}
                      itemStyle={{ color: '#FFD700' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
              <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                <i className="ri-line-chart-line mr-2"></i>
                Comparaison des stratégies d'optimisation
              </h4>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={optimisationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#8B7355" />
                  <XAxis dataKey="strategie" stroke="#D4AF37" angle={-15} textAnchor="end" height={100} />
                  <YAxis stroke="#D4AF37" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '2px solid #D4AF37', borderRadius: '8px' }}
                    labelStyle={{ color: '#D4AF37' }}
                    itemStyle={{ color: '#FFD700' }}
                  />
                  <Legend wrapperStyle={{ color: '#D4AF37' }} />
                  <Bar dataKey="droits" fill="#FF6B6B" name="Droits à payer" />
                  <Bar dataKey="netTransmis" fill="#D4AF37" name="Net transmis" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
              <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                <i className="ri-radar-line mr-2"></i>
                Analyse radar des stratégies
              </h4>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#8B7355" />
                  <PolarAngleAxis dataKey="critere" stroke="#D4AF37" />
                  <PolarRadiusAxis stroke="#D4AF37" />
                  <Radar name="Performance" dataKey="valeur" stroke="#D4AF37" fill="#D4AF37" fillOpacity={0.6} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '2px solid #D4AF37', borderRadius: '8px' }}
                    labelStyle={{ color: '#D4AF37' }}
                    itemStyle={{ color: '#FFD700' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {impactFiscalStrategies.map((strat, index) => (
                <div key={index} className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-4">
                  <h5 className="text-lg font-bold text-amber-400 mb-3">{strat.strategie}</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-amber-300 text-sm">Économie</span>
                      <span className="text-green-400 font-bold">{strat.economie.toLocaleString('fr-FR')} €</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-300 text-sm">Complexité</span>
                      <div className="flex">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div key={i} className={`w-2 h-4 mx-0.5 rounded ${i < strat.complexite ? 'bg-amber-500' : 'bg-amber-900/30'}`}></div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-300 text-sm">Délai</span>
                      <span className="text-amber-400 font-bold">{strat.delai} mois</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'dutreil':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
              <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                <i className="ri-building-2-line mr-2"></i>
                Le Pacte Dutreil : Exonération de 75%
              </h4>
              <p className="text-amber-200 mb-6 text-lg">
                Le Pacte Dutreil permet de bénéficier d'une exonération de 75% de la valeur des titres d'une entreprise lors de leur transmission, 
                sous conditions d'engagement de conservation.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <h5 className="text-lg font-bold text-amber-300 mb-3 flex items-center">
                      <i className="ri-checkbox-circle-line mr-2"></i>
                      Conditions à respecter
                    </h5>
                    <ul className="space-y-2 text-amber-100">
                      <li className="flex items-start">
                        <i className="ri-arrow-right-s-line text-amber-400 mr-2 mt-1"></i>
                        <span><strong className="text-amber-300">Engagement collectif :</strong> 2 ans minimum avant la transmission</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-arrow-right-s-line text-amber-400 mr-2 mt-1"></i>
                        <span><strong className="text-amber-300">Engagement individuel :</strong> 4 ans minimum après la transmission</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-arrow-right-s-line text-amber-400 mr-2 mt-1"></i>
                        <span><strong className="text-amber-300">Fonction de direction :</strong> Un héritier doit exercer pendant 3 ans</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-arrow-right-s-line text-amber-400 mr-2 mt-1"></i>
                        <span><strong className="text-amber-300">Activité opérationnelle :</strong> Pas de société holding pure</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-arrow-right-s-line text-amber-400 mr-2 mt-1"></i>
                        <span><strong className="text-amber-300">Seuil de détention :</strong> Au moins 34% du capital en pleine propriété</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <h5 className="text-lg font-bold text-amber-300 mb-3 flex items-center">
                      <i className="ri-lightbulb-line mr-2"></i>
                      Avantages
                    </h5>
                    <ul className="space-y-2 text-amber-100">
                      <li className="flex items-start">
                        <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                        <span>Exonération de 75% de la valeur des titres</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                        <span>Économie fiscale très importante (jusqu'à 150 000 € et plus)</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                        <span>Transmission anticipée de l'entreprise familiale</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                        <span>Pérennité de l'entreprise assurée</span>
                      </li>
                      <li className="flex items-start">
                        <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                        <span>Cumulable avec les abattements classiques</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-2 border-amber-500 rounded-lg p-6">
                    <h5 className="text-lg font-bold text-amber-300 mb-4 flex items-center">
                      <i className="ri-calculator-line mr-2"></i>
                      Exemple de calcul
                    </h5>
                    <div className="space-y-3">
                      <div className="bg-black/40 border border-amber-700 rounded p-3">
                        <div className="text-amber-300 text-sm mb-1">Valeur de l'entreprise</div>
                        <div className="text-2xl font-bold text-amber-400">1 000 000 €</div>
                      </div>
                      <div className="bg-black/40 border border-amber-700 rounded p-3">
                        <div className="text-amber-300 text-sm mb-1">Exonération Dutreil (75%)</div>
                        <div className="text-2xl font-bold text-green-400">- 750 000 €</div>
                      </div>
                      <div className="bg-black/40 border border-amber-700 rounded p-3">
                        <div className="text-amber-300 text-sm mb-1">Base taxable</div>
                        <div className="text-2xl font-bold text-amber-400">250 000 €</div>
                      </div>
                      <div className="bg-black/40 border border-amber-700 rounded p-3">
                        <div className="text-amber-300 text-sm mb-1">Abattement enfant</div>
                        <div className="text-2xl font-bold text-green-400">- 100 000 €</div>
                      </div>
                      <div className="bg-black/40 border border-amber-700 rounded p-3">
                        <div className="text-amber-300 text-sm mb-1">Assiette taxable finale</div>
                        <div className="text-2xl font-bold text-amber-400">150 000 €</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 border-2 border-green-500 rounded p-3">
                        <div className="text-green-300 text-sm mb-1">Droits à payer (environ 20%)</div>
                        <div className="text-3xl font-bold text-green-400">30 000 €</div>
                      </div>
                      <div className="bg-gradient-to-r from-red-900/40 to-red-800/40 border-2 border-red-500 rounded p-3">
                        <div className="text-red-300 text-sm mb-1">Sans Pacte Dutreil</div>
                        <div className="text-2xl font-bold text-red-400">≈ 180 000 €</div>
                      </div>
                      <div className="bg-gradient-to-r from-amber-900/60 to-amber-700/60 border-2 border-amber-400 rounded p-4">
                        <div className="text-amber-200 text-sm mb-1">💰 Économie réalisée</div>
                        <div className="text-3xl font-bold text-amber-300">150 000 €</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                <h5 className="text-lg font-bold text-amber-300 mb-3 flex items-center">
                  <i className="ri-alert-line mr-2"></i>
                  Points d'attention
                </h5>
                <ul className="space-y-2 text-amber-100">
                  <li className="flex items-start">
                    <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                    <span>Le non-respect des engagements entraîne la remise en cause de l'exonération avec pénalités</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                    <span>La fonction de direction doit être effective (pas seulement honorifique)</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                    <span>Nécessite une anticipation de 2 ans minimum avant la transmission</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                    <span>Incompatible avec certaines activités (gestion de patrimoine mobilier principalement)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'demembrement':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-split-cells-horizontal mr-2"></i>
                  Paramètres du démembrement
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Valeur du bien</label>
                    <input
                      type="number"
                      value={valeurBien}
                      onChange={(e) => setValeurBien(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Âge de l'usufruitier</label>
                    <input
                      type="number"
                      value={ageUsufuitier}
                      onChange={(e) => setAgeUsufuitier(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Durée de l'usufruit (0 = viager)</label>
                    <input
                      type="number"
                      value={dureeUsufruit}
                      onChange={(e) => setDureeUsufruit(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Lien de parenté</label>
                    <select
                      value={lienParente}
                      onChange={(e) => setLienParente(e.target.value)}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 pr-8 text-amber-100 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="enfant">Enfant</option>
                      <option value="petit-enfant">Petit-enfant</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Barème fiscal de l'usufruit</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm text-amber-100">
                    <div className="flex justify-between border-b border-amber-800 py-1">
                      <span>{'<'} 21 ans</span>
                      <span className="font-bold text-amber-400">90%</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-800 py-1">
                      <span>71-80 ans</span>
                      <span className="font-bold text-amber-400">30%</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-800 py-1">
                      <span>21-30 ans</span>
                      <span className="font-bold text-amber-400">80%</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-800 py-1">
                      <span>81-90 ans</span>
                      <span className="font-bold text-amber-400">20%</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-800 py-1">
                      <span>31-40 ans</span>
                      <span className="font-bold text-amber-400">70%</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-800 py-1">
                      <span>{'>'} 91 ans</span>
                      <span className="font-bold text-amber-400">10%</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-800 py-1">
                      <span>41-50 ans</span>
                      <span className="font-bold text-amber-400">60%</span>
                    </div>
                    <div></div>
                    <div className="flex justify-between py-1">
                      <span className="text-amber-300">Temporaire</span>
                      <span className="font-bold text-amber-400">23%/an</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-800 py-1">
                      <span>51-60 ans</span>
                      <span className="font-bold text-amber-400">50%</span>
                    </div>
                    <div></div>
                    <div className="flex justify-between py-1">
                      <span>61-70 ans</span>
                      <span className="font-bold text-amber-400">40%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-file-list-3-line mr-2"></i>
                  Résultats du calcul
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Taux de l'usufruit</div>
                    <div className="text-2xl font-bold text-amber-400">{dembrementResult.tauxUsufruit} %</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Valeur de l'usufruit</div>
                    <div className="text-2xl font-bold text-amber-400">{dembrementResult.valeurUsufruit.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Valeur de la nue-propriété</div>
                    <div className="text-2xl font-bold text-amber-400">{dembrementResult.valeurNuePropriete.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 border-2 border-green-500 rounded-lg p-4">
                    <div className="text-green-300 text-sm mb-1">💰 Économie immédiate (donation NP)</div>
                    <div className="text-2xl font-bold text-green-400">{dembrementResult.economieImmediateNP.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 border-2 border-green-500 rounded-lg p-4">
                    <div className="text-green-300 text-sm mb-1">💰 Économie à la succession</div>
                    <div className="text-2xl font-bold text-green-400">{dembrementResult.economieSuccession.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-900/60 to-amber-700/60 border-2 border-amber-400 rounded-lg p-4">
                    <div className="text-amber-200 text-sm mb-1">💎 Économie globale totale</div>
                    <div className="text-3xl font-bold text-amber-300">{dembrementResult.economieGlobale.toLocaleString('fr-FR')} €</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
              <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                <i className="ri-information-line mr-2"></i>
                Comprendre le démembrement
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Principe</h5>
                  <p className="text-amber-100 mb-4">
                    Le démembrement consiste à séparer la propriété d'un bien en deux droits distincts :
                  </p>
                  <ul className="space-y-2 text-amber-100">
                    <li className="flex items-start">
                      <i className="ri-key-line text-amber-400 mr-2 mt-1"></i>
                      <span><strong className="text-amber-300">L'usufruit :</strong> droit d'utiliser le bien et d'en percevoir les revenus</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-home-line text-amber-400 mr-2 mt-1"></i>
                      <span><strong className="text-amber-300">La nue-propriété :</strong> droit de disposer du bien (le vendre, le donner)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Avantages fiscaux</h5>
                  <ul className="space-y-2 text-amber-100">
                    <li className="flex items-start">
                      <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                      <span>Les droits de donation ne portent que sur la valeur de la nue-propriété</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                      <span>À votre décès, le nu-propriétaire récupère la pleine propriété sans droits supplémentaires</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                      <span>Vous conservez l'usage du bien et les revenus à vie</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                      <span>Double économie : à la donation et à la succession</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'donation':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-gift-line mr-2"></i>
                  Paramètres de la donation
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Montant de la donation</label>
                    <input
                      type="number"
                      value={montantDonation}
                      onChange={(e) => setMontantDonation(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Type de donation</label>
                    <select
                      value={typeDonation}
                      onChange={(e) => setTypeDonation(e.target.value)}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 pr-8 text-amber-100 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="simple">Donation simple</option>
                      <option value="partage">Donation-partage</option>
                      <option value="residuelle">Donation résiduelle</option>
                      <option value="graduelle">Donation graduelle</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Fréquence des donations (années)</label>
                    <input
                      type="number"
                      value={frequenceDonation}
                      onChange={(e) => setFrequenceDonation(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Lien de parenté</label>
                    <select
                      value={lienParente}
                      onChange={(e) => setLienParente(e.target.value)}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 pr-8 text-amber-100 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="enfant">Enfant</option>
                      <option value="petit-enfant">Petit-enfant</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Abattements 2024</h5>
                  <div className="space-y-2 text-sm text-amber-100">
                    <div className="flex justify-between border-b border-amber-800 py-2">
                      <span>Enfant</span>
                      <span className="font-bold text-amber-400">100 000 €</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-800 py-2">
                      <span>Petit-enfant</span>
                      <span className="font-bold text-amber-400">31 865 €</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-800 py-2">
                      <span>Arrière-petit-enfant</span>
                      <span className="font-bold text-amber-400">5 310 €</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Renouvellement</span>
                      <span className="font-bold text-green-400">Tous les 15 ans</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-file-list-3-line mr-2"></i>
                  Simulation sur 30 ans
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Droits par donation</div>
                    <div className="text-2xl font-bold text-amber-400">{donationResult.droitsDonation.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Nombre de donations possibles</div>
                    <div className="text-2xl font-bold text-amber-400">{donationResult.nombreDonations}</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Total transmis sur 30 ans</div>
                    <div className="text-2xl font-bold text-amber-400">{donationResult.totalDonne.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Total des droits payés</div>
                    <div className="text-2xl font-bold text-red-400">{donationResult.totalDroits.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 border-2 border-green-500 rounded-lg p-4">
                    <div className="text-green-300 text-sm mb-1">💰 Économie vs succession classique</div>
                    <div className="text-3xl font-bold text-green-400">{donationResult.economie.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-900/60 to-amber-700/60 border-2 border-amber-400 rounded-lg p-4">
                    <div className="text-amber-200 text-sm mb-1">Taux d'économie</div>
                    <div className="text-3xl font-bold text-amber-300">{donationResult.tauxEconomie.toFixed(1)} %</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
              <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                <i className="ri-information-line mr-2"></i>
                Types de donations
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                  <h5 className="text-lg font-bold text-amber-300 mb-3 flex items-center">
                    <i className="ri-gift-line text-amber-400 mr-2"></i>
                    Donation simple
                  </h5>
                  <p className="text-amber-100 mb-3">
                    Transmission immédiate et irrévocable d'un bien. Le donataire en devient propriétaire immédiatement.
                  </p>
                  <div className="text-sm text-amber-200">
                    <strong>Avantage :</strong> Simple et rapide, abattement renouvelable tous les 15 ans
                  </div>
                </div>

                <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                  <h5 className="text-lg font-bold text-amber-300 mb-3 flex items-center">
                    <i className="ri-scales-line text-amber-400 mr-2"></i>
                    Donation-partage
                  </h5>
                  <p className="text-amber-100 mb-3">
                    Permet de répartir ses biens entre plusieurs héritiers en figeant leur valeur au jour de la donation.
                  </p>
                  <div className="text-sm text-amber-200">
                    <strong>Avantage :</strong> Prévient les conflits futurs, valeur figée définitivement
                  </div>
                </div>

                <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                  <h5 className="text-lg font-bold text-amber-300 mb-3 flex items-center">
                    <i className="ri-arrow-right-line text-amber-400 mr-2"></i>
                    Donation résiduelle
                  </h5>
                  <p className="text-amber-100 mb-3">
                    Le premier donataire doit transmettre ce qui reste du bien à un second bénéficiaire à son décès.
                  </p>
                  <div className="text-sm text-amber-200">
                    <strong>Usage :</strong> Protéger le conjoint puis transmettre aux enfants
                  </div>
                </div>

                <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                  <h5 className="text-lg font-bold text-amber-300 mb-3 flex items-center">
                    <i className="ri-arrow-down-line text-amber-400 mr-2"></i>
                    Donation graduelle
                  </h5>
                  <p className="text-amber-100 mb-3">
                    Le premier donataire doit obligatoirement transmettre le bien au second bénéficiaire, même s'il l'a vendu.
                  </p>
                  <div className="text-sm text-amber-200">
                    <strong>Usage :</strong> Transmission transgénérationnelle sécurisée
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-2 border-amber-500 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-lightbulb-line text-black text-2xl"></i>
                </div>
                <div>
                  <h5 className="text-xl font-bold text-amber-300 mb-3">Stratégie optimale</h5>
                  <p className="text-amber-100 mb-3">
                    Pour maximiser l'efficacité fiscale, privilégiez les donations régulières tous les 15 ans. 
                    Un couple avec 2 enfants peut ainsi transmettre 800 000 € sur 30 ans sans droits de donation.
                  </p>
                  <div className="bg-black/40 border border-amber-700 rounded p-3 text-amber-200 text-sm">
                    <strong>Calcul :</strong> 100 000 € (abattement) × 2 (parents) × 2 (enfants) × 2 (périodes de 15 ans) = 800 000 €
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'assurance-vie':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-shield-check-line mr-2"></i>
                  Paramètres de l'assurance-vie
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Capital total de l'assurance-vie</label>
                    <input
                      type="number"
                      value={capitalAssuranceVie}
                      onChange={(e) => setCapitalAssuranceVie(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Âge à la souscription</label>
                    <input
                      type="number"
                      value={ageSouscription}
                      onChange={(e) => setAgeSouscription(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Versements après 70 ans</label>
                    <input
                      type="number"
                      value={versementsApres70}
                      onChange={(e) => setVersementsApres70(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Nombre de bénéficiaires</label>
                    <input
                      type="number"
                      value={nombreBeneficiaires}
                      onChange={(e) => setNombreBeneficiaires(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6 bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Fiscalité de l'assurance-vie</h5>
                  <div className="space-y-3 text-sm text-amber-100">
                    <div className="border-b border-amber-800 pb-2">
                      <div className="font-bold text-amber-300 mb-1">Versements avant 70 ans</div>
                      <div>• Abattement : 152 500 € par bénéficiaire</div>
                      <div>• Puis 20% jusqu'à 700 000 €</div>
                      <div>• Puis 31,25% au-delà</div>
                    </div>
                    <div>
                      <div className="font-bold text-amber-300 mb-1">Versements après 70 ans</div>
                      <div>• Abattement global : 30 500 €</div>
                      <div>• Puis droits de succession classiques</div>
                      <div>• Intérêts et plus-values exonérés</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-file-list-3-line mr-2"></i>
                  Résultats du calcul
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Versements avant 70 ans</div>
                    <div className="text-2xl font-bold text-amber-400">{assuranceVieResult.versementsAvant70.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Droits sur versements avant 70 ans</div>
                    <div className="text-2xl font-bold text-red-400">{assuranceVieResult.droitsAvant70.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Versements après 70 ans</div>
                    <div className="text-2xl font-bold text-amber-400">{assuranceVieResult.versementsApres70.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Droits sur versements après 70 ans</div>
                    <div className="text-2xl font-bold text-red-400">{assuranceVieResult.droitsApres70.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-gradient-to-r from-red-900/40 to-red-800/40 border-2 border-red-500 rounded-lg p-4">
                    <div className="text-red-300 text-sm mb-1">Total des droits à payer</div>
                    <div className="text-3xl font-bold text-red-400">{assuranceVieResult.droitsTotal.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 border-2 border-green-500 rounded-lg p-4">
                    <div className="text-green-300 text-sm mb-1">💰 Économie vs succession classique</div>
                    <div className="text-3xl font-bold text-green-400">{assuranceVieResult.economie.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-900/60 to-amber-700/60 border-2 border-amber-400 rounded-lg p-4">
                    <div className="text-amber-200 text-sm mb-1">Taux d'économie</div>
                    <div className="text-3xl font-bold text-amber-300">{assuranceVieResult.tauxEconomie.toFixed(1)} %</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
              <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                <i className="ri-information-line mr-2"></i>
                Avantages de l'assurance-vie
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mb-3">
                    <i className="ri-shield-check-line text-black text-2xl"></i>
                  </div>
                  <h5 className="text-lg font-bold text-amber-300 mb-2">Fiscalité avantageuse</h5>
                  <p className="text-amber-100 text-sm">
                    Abattement de 152 500 € par bénéficiaire pour les versements avant 70 ans, 
                    permettant une transmission optimisée.
                  </p>
                </div>

                <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mb-3">
                    <i className="ri-user-add-line text-black text-2xl"></i>
                  </div>
                  <h5 className="text-lg font-bold text-amber-300 mb-2">Libre désignation</h5>
                  <p className="text-amber-100 text-sm">
                    Vous pouvez désigner librement vos bénéficiaires, même hors cadre familial, 
                    et modifier la clause à tout moment.
                  </p>
                </div>

                <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mb-3">
                    <i className="ri-lock-line text-black text-2xl"></i>
                  </div>
                  <h5 className="text-lg font-bold text-amber-300 mb-2">Hors succession</h5>
                  <p className="text-amber-100 text-sm">
                    Les capitaux transmis ne font pas partie de la succession et échappent 
                    aux règles de réserve héréditaire.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-2 border-amber-500 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-lightbulb-line text-black text-2xl"></i>
                </div>
                <div>
                  <h5 className="text-xl font-bold text-amber-300 mb-3">Stratégie recommandée</h5>
                  <ul className="space-y-2 text-amber-100">
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span>Privilégiez les versements avant 70 ans pour bénéficier de l'abattement de 152 500 € par bénéficiaire</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span>Ouvrez plusieurs contrats pour diversifier et optimiser la transmission</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span>Pensez au démembrement de la clause bénéficiaire pour optimiser encore plus</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span>Revoyez régulièrement votre clause bénéficiaire selon l'évolution de votre situation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const calculateSCPI = () => {
    const revenuAnnuel = montantInvestissementSCPI * (tauxRendementSCPI / 100);
    
    let prixAchatReel = montantInvestissementSCPI;
    let revenusPendantDemembrement = 0;
    
    if (typeDembrementSCPI === 'nue-propriete') {
      prixAchatReel = montantInvestissementSCPI * (1 - decoteSCPI / 100);
      revenusPendantDemembrement = 0;
    } else if (typeDembrementSCPI === 'usufruit') {
      prixAchatReel = montantInvestissementSCPI * (decoteSCPI / 100);
      revenusPendantDemembrement = revenuAnnuel * dureeDecombrementSCPI;
    } else {
      revenusPendantDemembrement = revenuAnnuel * horizonInvestissementSCPI;
    }
    
    const TMI = 0.30;
    const prelevementsSociaux = 0.172;
    const fiscaliteAnnuelle = revenuAnnuel * (TMI + prelevementsSociaux);
    const revenuNetAnnuel = revenuAnnuel - fiscaliteAnnuelle;
    
    const totalRevenusNets = typeDembrementSCPI === 'nue-propriete' 
      ? 0 
      : revenuNetAnnuel * (typeDembrementSCPI === 'usufruit' ? dureeDecombrementSCPI : horizonInvestissementSCPI);
    
    const valeurFinale = typeDembrementSCPI === 'usufruit' ? 0 : montantInvestissementSCPI;
    const gainTotal = totalRevenusNets + valeurFinale - prixAchatReel;
    const rendementGlobal = prixAchatReel > 0 ? (gainTotal / prixAchatReel) * 100 : 0;
    
    return {
      prixAchatReel,
      revenuAnnuel,
      revenuNetAnnuel,
      fiscaliteAnnuelle,
      totalRevenusNets,
      valeurFinale,
      gainTotal,
      rendementGlobal,
      economieDecote: montantInvestissementSCPI - prixAchatReel
    };
  };

  const scpiResult = calculateSCPI();

  const calculateProjectionSCPI = () => {
    const projections = [];
    const revenuAnnuel = montantInvestissementSCPI * (tauxRendementSCPI / 100);
    const TMI = 0.30;
    const prelevementsSociaux = 0.172;
    const fiscaliteAnnuelle = revenuAnnuel * (TMI + prelevementsSociaux);
    const revenuNetAnnuel = revenuAnnuel - fiscaliteAnnuelle;
    
    for (let annee = 0; annee <= horizonInvestissementSCPI; annee++) {
      let revenusCumules = 0;
      let valeurParts = montantInvestissementSCPI;
      
      if (typeDembrementSCPI === 'nue-propriete') {
        revenusCumules = 0;
        valeurParts = annee >= dureeDecombrementSCPI ? montantInvestissementSCPI : scpiResult.prixAchatReel;
      } else if (typeDembrementSCPI === 'usufruit') {
        revenusCumules = annee <= dureeDecombrementSCPI ? revenuNetAnnuel * annee : revenuNetAnnuel * dureeDecombrementSCPI;
        valeurParts = 0;
      } else {
        revenusCumules = revenuNetAnnuel * annee;
        valeurParts = montantInvestissementSCPI * Math.pow(1.02, annee);
      }
      
      projections.push({
        annee,
        revenusCumules,
        valeurParts,
        patrimoineTotal: revenusCumules + valeurParts,
        rendement: annee > 0 ? ((revenusCumules + valeurParts - scpiResult.prixAchatReel) / scpiResult.prixAchatReel) * 100 : 0
      });
    }
    
    return projections;
  };

  const projectionSCPI = calculateProjectionSCPI();

  const calculateComparisonSCPI = () => {
    const strategies = [];
    const revenuAnnuel = montantInvestissementSCPI * (tauxRendementSCPI / 100);
    const revenuNetAnnuel = revenuAnnuel * (1 - 0.30 - 0.172);
    
    strategies.push({
      nom: 'Pleine propriété',
      investissement: montantInvestissementSCPI,
      revenus20ans: revenuNetAnnuel * 20,
      valeurFinale: montantInvestissementSCPI * 1.4,
      gainTotal: (revenuNetAnnuel * 20) + (montantInvestissementSCPI * 0.4),
      complexite: 2,
      liquidite: 6,
      fiscalite: 4,
      score: 7
    });
    
    strategies.push({
      nom: 'Nue-propriété 15 ans',
      investissement: montantInvestissementSCPI * 0.65,
      revenus20ans: revenuNetAnnuel * 5,
      valeurFinale: montantInvestissementSCPI * 1.4,
      gainTotal: (revenuNetAnnuel * 5) + (montantInvestissementSCPI * 0.4) - (montantInvestissementSCPI * 0.35),
      complexite: 5,
      liquidite: 2,
      fiscalite: 9,
      score: 8.5
    });
    
    strategies.push({
      nom: 'Usufruit 15 ans',
      investissement: montantInvestissementSCPI * 0.35,
      revenus20ans: revenuNetAnnuel * 15,
      valeurFinale: 0,
      gainTotal: (revenuNetAnnuel * 15) - (montantInvestissementSCPI * 0.65),
      complexite: 5,
      liquidite: 1,
      fiscalite: 7,
      score: 7.5
    });
    
    strategies.push({
      nom: 'Donation nue-propriété',
      investissement: montantInvestissementSCPI,
      revenus20ans: revenuNetAnnuel * 20,
      valeurFinale: montantInvestissementSCPI * 1.4,
      gainTotal: (revenuNetAnnuel * 20) + (montantInvestissementSCPI * 0.4),
      complexite: 7,
      liquidite: 4,
      fiscalite: 10,
      score: 9
    });
    
    return strategies;
  };

  const strategiesSCPI = calculateComparisonSCPI();

  const calculateDeficitFoncier = () => {
    const loyerAnnuel = loyerMensuelDeficit * 12;
    const revenusBruts = loyerAnnuel;
    const chargesDeductibles = chargesAnnuellesDeficit;
    const revenusFonciers = revenusBruts - chargesDeductibles;
    
    const travauxAnnuels = montantTravauxDeficit / dureeTravauxDeficit;
    const deficitAnnuel = Math.max(0, travauxAnnuels - revenusFonciers);
    const deficitImputableRevenuGlobal = Math.min(deficitAnnuel, 10700);
    const deficitReportable = Math.max(0, deficitAnnuel - 10700);
    
    const economieImpotAnnuelle = deficitImputableRevenuGlobal * (TMIDeficit / 100);
    const economieImpotTotale = economieImpotAnnuelle * dureeTravauxDeficit;
    
    const revenusFonciersApresTravauxAnnuel = revenusFonciers;
    const impotApresTravauxAnnuel = Math.max(0, revenusFonciersApresTravauxAnnuel) * (TMIDeficit / 100 + 0.172);
    
    const cashFlowPendantTravaux = revenusBruts - chargesDeductibles - travauxAnnuels + economieImpotAnnuelle;
    const cashFlowApresTravaux = revenusBruts - chargesDeductibles - impotApresTravauxAnnuel;
    
    const investissementTotal = prixAchatDeficit + montantTravauxDeficit;
    const plusValuePotentielle = investissementTotal * 0.20;
    const valeurFinale = investissementTotal + plusValuePotentielle;
    
    return {
      revenusBruts,
      travauxAnnuels,
      deficitAnnuel,
      deficitImputableRevenuGlobal,
      deficitReportable,
      economieImpotAnnuelle,
      economieImpotTotale,
      cashFlowPendantTravaux,
      cashFlowApresTravaux,
      investissementTotal,
      valeurFinale,
      plusValuePotentielle
    };
  };

  const deficitResult = calculateDeficitFoncier();

  const calculateProjectionDeficit = () => {
    const projections = [];
    let cumulEconomies = 0;
    let cumulCashFlow = 0;
    
    for (let annee = 0; annee <= 20; annee++) {
      if (annee < dureeTravauxDeficit) {
        cumulEconomies += deficitResult.economieImpotAnnuelle;
        cumulCashFlow += deficitResult.cashFlowPendantTravaux;
      } else {
        cumulCashFlow += deficitResult.cashFlowApresTravaux;
      }
      
      const valeurBien = deficitResult.investissementTotal * Math.pow(1.02, annee);
      const gainTotal = cumulCashFlow + valeurBien - deficitResult.investissementTotal;
      
      projections.push({
        annee,
        cumulEconomies,
        cumulCashFlow,
        valeurBien,
        gainTotal,
        rendement: (gainTotal / deficitResult.investissementTotal) * 100
      });
    }
    
    return projections;
  };

  const projectionDeficit = calculateProjectionDeficit();

  const calculateProjectionPinel = () => {
    const projections = [];
    let cumulReductions = 0;
    let cumulCashFlow = 0;
    
    for (let annee = 0; annee <= 20; annee++) {
      if (annee < dureePinel) {
        cumulReductions += pinelResult.reductionAnnuelle;
        cumulCashFlow += pinelResult.cashFlowAnnuel;
      } else {
        const loyerAnnuel = pinelResult.loyerReelAnnuel * Math.pow(1.015, annee - dureePinel);
        const chargesAnnuelles = prixAchatPinel * 0.015;
        const impot = Math.max(0, loyerAnnuel - chargesAnnuelles) * 0.472;
        cumulCashFlow += loyerAnnuel - chargesAnnuelles - impot;
      }
      
      const valeurBien = prixAchatPinel * Math.pow(1.02, annee);
      const gainTotal = cumulCashFlow + valeurBien - prixAchatPinel;
      
      projections.push({
        annee,
        cumulReductions,
        cumulCashFlow,
        valeurBien,
        gainTotal,
        rendement: (gainTotal / prixAchatPinel) * 100
      });
    }
    
    return projections;
  };

  const projectionPinel = calculateProjectionPinel();

  const calculateProjectionMalraux = () => {
    const projections = [];
    let cumulReductions = 0;
    let cumulCashFlow = 0;
    
    for (let annee = 0; annee <= 20; annee++) {
      if (annee < dureeTravauxMalraux) {
        cumulReductions += malrauxResult.reductionAnnuelle;
        cumulCashFlow += malrauxResult.cashFlowPendantTravaux;
      } else {
        cumulCashFlow += malrauxResult.cashFlowApresTravaux;
      }
      
      const valeurBien = malrauxResult.investissementTotal * Math.pow(1.025, annee);
      const gainTotal = cumulCashFlow + valeurBien - malrauxResult.investissementTotal;
      
      projections.push({
        annee,
        cumulReductions,
        cumulCashFlow,
        valeurBien,
        gainTotal,
        rendement: (gainTotal / malrauxResult.investissementTotal) * 100
      });
    }
    
    return projections;
  };

  const projectionMalraux = calculateProjectionMalraux();

  const renderImmobilierContent = () => {
    switch (immobilierSubTab) {
      case 'sci':
        return (
          <div className="space-y-6" key="sci-content">
            {/* Boutons fonctionnalités ULTRA-AVANCÉES */}
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-2 border-purple-500/50 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <i className="ri-cpu-line text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-purple-400">Fonctionnalités IA Ultra-Avancées</h4>
                  <p className="text-purple-300/70 text-xs">Analyse prédictive et optimisation par intelligence artificielle</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                <button
                  onClick={() => setShowMonteCarloSimulation(!showMonteCarloSimulation)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showMonteCarloSimulation
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-bar-chart-box-line mr-1"></i>
                  Monte Carlo
                </button>
                <button
                  onClick={() => setShowAIOptimizer(!showAIOptimizer)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showAIOptimizer
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-brain-line mr-1"></i>
                  IA Optimizer
                </button>
                <button
                  onClick={() => setShowScenarioBuilder(!showScenarioBuilder)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showScenarioBuilder
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-settings-3-line mr-1"></i>
                  Scénarios
                </button>
                <button
                  onClick={() => setShowPredictiveAnalytics(!showPredictiveAnalytics)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showPredictiveAnalytics
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-time-line mr-1"></i>
                  Prédictif
                </button>
                <button
                  onClick={() => setShowCashFlowWaterfall(!showCashFlowWaterfall)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showCashFlowWaterfall
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-water-flash-line mr-1"></i>
                  Waterfall
                </button>
                <button
                  onClick={() => setShowBenchmarking(!showBenchmarking)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showBenchmarking
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-trophy-line mr-1"></i>
                  Benchmark
                </button>
              </div>
            </div>

            {/* Boutons standards */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setShowProjection(!showProjection)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showProjection
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <i className="ri-line-chart-line mr-2"></i>
                {showProjection ? 'Masquer' : 'Afficher'} Projection Temporelle
              </button>
              <button
                onClick={() => setShowComparison(!showComparison)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showComparison
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <i className="ri-bar-chart-grouped-line mr-2"></i>
                {showComparison ? 'Masquer' : 'Afficher'} Comparaison Stratégies
              </button>
              <button
                onClick={() => setShowOptimizer(!showOptimizer)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showOptimizer
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <i className="ri-magic-line mr-2"></i>
                {showOptimizer ? 'Masquer' : 'Afficher'} Optimiseur Intelligent
              </button>
            </div>

            {/* Calculateur principal SCI */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-building-4-line mr-2"></i>
                  Paramètres de la SCI Familiale
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Capital social de la SCI</label>
                    <input
                      type="number"
                      value={capitalSCI}
                      onChange={(e) => setCapitalSCI(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Nombre de parts sociales</label>
                    <input
                      type="number"
                      value={nombreParts}
                      onChange={(e) => setNombreParts(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Revenus locatifs annuels</label>
                    <input
                      type="number"
                      value={revenusLocatifs}
                      onChange={(e) => setRevenusLocatifs(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Charges annuelles de la SCI</label>
                    <input
                      type="number"
                      value={chargesSCI}
                      onChange={(e) => setChargesSCI(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Lien de parenté</label>
                    <select
                      value={lienParente}
                      onChange={(e) => setLienParente(e.target.value)}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 pr-8 text-amber-100 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="enfant">Enfant</option>
                      <option value="petit-enfant">Petit-enfant</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Avantages de la SCI</h5>
                  <ul className="space-y-2 text-amber-100 text-sm">
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-green-400 mr-2 mt-1"></i>
                      <span>Décote de 10 à 30% sur la valeur des parts</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-green-400 mr-2 mt-1"></i>
                      <span>Transmission progressive sans démembrer le bien</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-green-400 mr-2 mt-1"></i>
                      <span>Gestion centralisée du patrimoine familial</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-green-400 mr-2 mt-1"></i>
                      <span>Protection via clauses statutaires</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-file-list-3-line mr-2"></i>
                  Résultats du calcul
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Résultat net annuel</div>
                    <div className="text-2xl font-bold text-amber-400">{sciResult.resultatNet.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Résultat après IS (0%)</div>
                    <div className="text-2xl font-bold text-green-400">{sciResult.resultatApresIS.toLocaleString('fr-FR')} €</div>
                    <div className="text-amber-300 text-xs mt-1">SCI à l'IR : pas d'impôt société</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Valeur d'une part</div>
                    <div className="text-2xl font-bold text-amber-400">{sciResult.valeurPart.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Valeur part décotée (10%)</div>
                    <div className="text-2xl font-bold text-green-400">{sciResult.valeurPartDecotee.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 border-2 border-green-500 rounded-lg p-4">
                    <div className="text-green-300 text-sm mb-1">💰 Économie grâce à la décote</div>
                    <div className="text-3xl font-bold text-green-400">{sciResult.economieDecote.toLocaleString('fr-FR')} €</div>
                    <div className="text-green-300 text-xs mt-1">Pour 100 parts données</div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-900/60 to-amber-700/60 border-2 border-amber-400 rounded-lg p-4">
                    <div className="text-amber-200 text-sm mb-1">Rendement net</div>
                    <div className="text-3xl font-bold text-amber-300">{sciResult.rendementNet.toFixed(2)} %</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projection temporelle SCI */}
            {showProjection && (
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-time-line mr-2"></i>
                  Projection Temporelle SCI - 20 ans
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-amber-300 mb-2 text-sm">Taux de croissance patrimoine (%)</label>
                    <input
                      type="number"
                      value={tauxCroissancePatrimoine}
                      onChange={(e) => setTauxCroissancePatrimoine(Number(e.target.value))}
                      className="w-full bg-black/40 border border-amber-700 rounded px-3 py-2 text-amber-100 text-sm"
                      step="0.5"
                    />
                  </div>
                  <div>
                    <label className="block text-amber-300 mb-2 text-sm">Croissance loyers annuelle (%)</label>
                    <input
                      type="number"
                      value={2}
                      className="w-full bg-black/40 border border-amber-700 rounded px-3 py-2 text-amber-100 text-sm"
                      step="0.5"
                      readOnly
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded px-4 py-2 w-full">
                      <div className="text-amber-300 text-xs">Valeur SCI projetée (an 20)</div>
                      <div className="text-amber-400 font-bold text-lg">
                        {(capitalSCI * Math.pow(1 + tauxCroissancePatrimoine / 100, 20)).toLocaleString('fr-FR')} €
                      </div>
                    </div>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={Array.from({ length: 21 }, (_, i) => ({
                    annee: i,
                    valeurSCI: capitalSCI * Math.pow(1 + tauxCroissancePatrimoine / 100, i),
                    revenusCumules: sciResult.resultatNet * i * Math.pow(1.02, i / 2),
                    patrimoineTotal: (capitalSCI * Math.pow(1 + tauxCroissancePatrimoine / 100, i)) + (sciResult.resultatNet * i * Math.pow(1.02, i / 2)),
                    rendement: i > 0 ? ((sciResult.resultatNet * i * Math.pow(1.02, i / 2)) / capitalSCI) * 100 : 0
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#8B7355" />
                    <XAxis dataKey="annee" stroke="#D4AF37" label={{ value: 'Années', position: 'insideBottom', offset: -5, fill: '#D4AF37' }} />
                    <YAxis yAxisId="left" stroke="#D4AF37" label={{ value: 'Montant (€)', angle: -90, position: 'insideLeft', fill: '#D4AF37' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#4ADE80" label={{ value: 'Rendement (%)', angle: 90, position: 'insideRight', fill: '#4ADE80' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '2px solid #D4AF37', borderRadius: '8px' }}
                      labelStyle={{ color: '#D4AF37' }}
                      itemStyle={{ color: '#FFD700' }}
                    />
                    <Legend wrapperStyle={{ color: '#D4AF37' }} />
                    <Area yAxisId="left" type="monotone" dataKey="valeurSCI" fill="#D4AF37" fillOpacity={0.3} stroke="#D4AF37" name="Valeur de la SCI" />
                    <Line yAxisId="left" type="monotone" dataKey="revenusCumules" stroke="#4ADE80" strokeWidth={2} name="Revenus cumulés" />
                    <Line yAxisId="left" type="monotone" dataKey="patrimoineTotal" stroke="#FFA500" strokeWidth={3} name="Patrimoine total" />
                    <Line yAxisId="right" type="monotone" dataKey="rendement" stroke="#4ADE80" strokeWidth={2} strokeDasharray="5 5" name="Rendement cumulé (%)" />
                  </ComposedChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Valeur SCI (an 20)</div>
                    <div className="text-amber-400 font-bold">
                      {(capitalSCI * Math.pow(1 + tauxCroissancePatrimoine / 100, 20)).toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Revenus cumulés</div>
                    <div className="text-green-400 font-bold">
                      {(sciResult.resultatNet * 20 * 1.2).toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Patrimoine total</div>
                    <div className="text-amber-400 font-bold">
                      {((capitalSCI * Math.pow(1 + tauxCroissancePatrimoine / 100, 20)) + (sciResult.resultatNet * 20 * 1.2)).toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Plus-value</div>
                    <div className="text-green-400 font-bold">
                      +{(((capitalSCI * Math.pow(1 + tauxCroissancePatrimoine / 100, 20)) / capitalSCI - 1) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Comparaison stratégies SCI */}
            {showComparison && (
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-bar-chart-grouped-line mr-2"></i>
                  Comparaison Multi-Stratégies SCI
                </h4>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={[
                      { nom: 'Donation directe', economie: 0, droits: capitalSCI * 0.20 },
                      { nom: 'SCI décote 10%', economie: capitalSCI * 0.02, droits: capitalSCI * 0.18 },
                      { nom: 'SCI décote 20%', economie: capitalSCI * 0.04, droits: capitalSCI * 0.16 },
                      { nom: 'SCI décote 30%', economie: capitalSCI * 0.06, droits: capitalSCI * 0.14 },
                      { nom: 'SCI + Démembrement', economie: capitalSCI * 0.12, droits: capitalSCI * 0.08 },
                      { nom: 'SCI + Donation progressive', economie: capitalSCI * 0.15, droits: capitalSCI * 0.05 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#8B7355" />
                      <XAxis dataKey="nom" stroke="#D4AF37" angle={-15} textAnchor="end" height={100} />
                      <YAxis stroke="#D4AF37" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: '2px solid #D4AF37', borderRadius: '8px' }}
                        labelStyle={{ color: '#D4AF37' }}
                        itemStyle={{ color: '#FFD700' }}
                      />
                      <Legend wrapperStyle={{ color: '#D4AF37' }} />
                      <Bar dataKey="economie" fill="#4ADE80" name="Économie (€)" />
                      <Bar dataKey="droits" fill="#FF6B6B" name="Droits à payer (€)" />
                    </BarChart>
                  </ResponsiveContainer>

                  <ResponsiveContainer width="100%" height={350}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="#8B7355" />
                      <XAxis dataKey="complexite" name="Complexité" stroke="#D4AF37" label={{ value: 'Complexité', position: 'insideBottom', offset: -5, fill: '#D4AF37' }} />
                      <YAxis dataKey="economie" name="Économie" stroke="#D4AF37" label={{ value: 'Économie (€)', angle: -90, position: 'insideLeft', fill: '#D4AF37' }} />
                      <ZAxis dataKey="delai" range={[100, 1000]} name="Délai" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: '2px solid #D4AF37', borderRadius: '8px' }}
                        labelStyle={{ color: '#D4AF37' }}
                        cursor={{ strokeDasharray: '3 3' }}
                      />
                      <Legend wrapperStyle={{ color: '#D4AF37' }} />
                      <Scatter name="Stratégies" data={[
                        { nom: 'Donation directe', complexite: 2, economie: 0, delai: 1 },
                        { nom: 'SCI décote 10%', complexite: 4, economie: capitalSCI * 0.02, delai: 3 },
                        { nom: 'SCI décote 20%', complexite: 5, economie: capitalSCI * 0.04, delai: 3 },
                        { nom: 'SCI décote 30%', complexite: 6, economie: capitalSCI * 0.06, delai: 4 },
                        { nom: 'SCI + Démembrement', complexite: 8, economie: capitalSCI * 0.12, delai: 6 },
                        { nom: 'SCI + Donation progressive', complexite: 7, economie: capitalSCI * 0.15, delai: 12 }
                      ]} fill="#D4AF37" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { nom: 'Donation directe', economie: 0, complexite: 2, delai: 1, score: 5 },
                    { nom: 'SCI décote 10%', economie: capitalSCI * 0.02, complexite: 4, delai: 3, score: 6.5 },
                    { nom: 'SCI décote 20%', economie: capitalSCI * 0.04, complexite: 5, delai: 3, score: 7.5 },
                    { nom: 'SCI décote 30%', economie: capitalSCI * 0.06, complexite: 6, delai: 4, score: 8 },
                    { nom: 'SCI + Démembrement', economie: capitalSCI * 0.12, complexite: 8, delai: 6, score: 9 },
                    { nom: 'SCI + Donation progressive', economie: capitalSCI * 0.15, complexite: 7, delai: 12, score: 9.5 }
                  ].map((strat, index) => (
                    <div key={index} className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                      <h5 className="text-lg font-bold text-amber-400 mb-3">{strat.nom}</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-amber-300">Économie</span>
                          <span className="text-green-400 font-bold">{strat.economie.toLocaleString('fr-FR')} €</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-amber-300">Complexité</span>
                          <div className="flex">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <div key={i} className={`w-2 h-4 mx-0.5 rounded ${i < strat.complexite ? 'bg-amber-500' : 'bg-amber-900/30'}`}></div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-amber-300">Délai</span>
                          <span className="text-amber-400 font-bold">{strat.delai} mois</span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-amber-700">
                          <div className="flex justify-between items-center">
                            <span className="text-amber-300 font-bold">Score global</span>
                            <span className="text-amber-400 font-bold text-lg">{strat.score}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optimiseur intelligent SCI */}
            {showOptimizer && (
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-magic-line mr-2"></i>
                  Optimiseur Intelligent SCI - Recommandations Personnalisées
                </h4>

                <div className="mb-6">
                  <label className="block text-amber-300 mb-2 font-medium">Tolérance au risque (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={toleranceRisque}
                    onChange={(e) => setToleranceRisque(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-amber-300 text-sm mt-1">
                    <span>Prudent</span>
                    <span className="font-bold text-amber-400">{toleranceRisque}/10</span>
                    <span>Audacieux</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { 
                      nom: 'SCI + Donation progressive optimale', 
                      economie: capitalSCI * 0.15, 
                      complexite: 7, 
                      delai: 12, 
                      risque: 4,
                      flexibilite: 8,
                      scoreOptimise: 9.5,
                      description: 'Transmission progressive tous les 15 ans avec décote SCI et abattements renouvelables'
                    },
                    { 
                      nom: 'SCI + Démembrement de parts', 
                      economie: capitalSCI * 0.12, 
                      complexite: 8, 
                      delai: 6, 
                      risque: 5,
                      flexibilite: 6,
                      scoreOptimise: 9.0,
                      description: 'Donation de la nue-propriété des parts avec conservation de l\'usufruit'
                    },
                    { 
                      nom: 'SCI avec décote maximale 30%', 
                      economie: capitalSCI * 0.06, 
                      complexite: 6, 
                      delai: 4, 
                      risque: 3,
                      flexibilite: 7,
                      scoreOptimise: 8.0,
                      description: 'Optimisation de la décote via clauses statutaires restrictives'
                    }
                  ].map((strat, index) => (
                    <div key={index} className={`bg-gradient-to-r ${
                      index === 0 ? 'from-amber-900/40 to-amber-800/40 border-2 border-amber-500' :
                      index === 1 ? 'from-amber-900/30 to-amber-800/30 border-2 border-amber-600' :
                      'from-amber-900/20 to-amber-800/20 border border-amber-700'
                    } rounded-lg p-5`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {index === 0 && (
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
                              <i className="ri-trophy-line text-black text-xl"></i>
                            </div>
                          )}
                          {index === 1 && (
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                              <i className="ri-medal-line text-black text-xl"></i>
                            </div>
                          )}
                          {index === 2 && (
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-800 rounded-full flex items-center justify-center">
                              <i className="ri-award-line text-white text-xl"></i>
                            </div>
                          )}
                          <div>
                            <h5 className="text-lg font-bold text-amber-300">{strat.nom}</h5>
                            <p className="text-amber-400/70 text-sm">
                              {index === 0 ? '🏆 Recommandation optimale' : index === 1 ? '🥈 Excellente alternative' : '🥉 Bonne option'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-amber-300 text-sm">Score optimisé</div>
                          <div className="text-2xl font-bold text-amber-400">{strat.scoreOptimise.toFixed(1)}</div>
                        </div>
                      </div>

                      <p className="text-amber-200 text-sm mb-4 italic">{strat.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Économie</div>
                          <div className="text-green-400 font-bold text-sm">{strat.economie.toLocaleString('fr-FR')} €</div>
                        </div>
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Complexité</div>
                          <div className="text-amber-400 font-bold text-sm">{strat.complexite}/10</div>
                        </div>
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Délai</div>
                          <div className="text-amber-400 font-bold text-sm">{strat.delai} mois</div>
                        </div>
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Risque</div>
                          <div className="text-amber-400 font-bold text-sm">{strat.risque}/10</div>
                        </div>
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Flexibilité</div>
                          <div className="text-amber-400 font-bold text-sm">{strat.flexibilite}/10</div>
                        </div>
                      </div>

                      {index === 0 && (
                        <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded p-3">
                          <p className="text-amber-200 text-sm">
                            <i className="ri-lightbulb-line mr-2 text-amber-400"></i>
                            <strong>Pourquoi cette stratégie ?</strong> Elle combine la décote SCI avec le renouvellement des abattements tous les 15 ans, 
                            permettant une transmission progressive optimisée. Économie potentielle de {strat.economie.toLocaleString('fr-FR')} € 
                            avec une flexibilité maximale et un risque maîtrisé.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Analyse de risque SCI */}
                <div className="mt-6 bg-black/40 border-2 border-amber-700 rounded-lg p-5">
                  <h5 className="text-lg font-bold text-amber-400 mb-4 flex items-center">
                    <i className="ri-shield-check-line mr-2"></i>
                    Analyse de Risque Détaillée SCI
                  </h5>
                  <div className="space-y-3">
                    {[
                      { facteur: 'Mésentente entre associés', impact: 8, probabilite: 5, mitigation: 'Clauses statutaires précises et pacte d\'associés' },
                      { facteur: 'Requalification fiscale', impact: 7, probabilite: 3, mitigation: 'Respect strict des formalités et gestion réelle' },
                      { facteur: 'Coûts de gestion élevés', impact: 5, probabilite: 8, mitigation: 'Mutualisation et optimisation comptable' },
                      { facteur: 'Blocage des décisions', impact: 6, probabilite: 4, mitigation: 'Règles de majorité adaptées dans les statuts' },
                      { facteur: 'Liquidité réduite des parts', impact: 7, probabilite: 7, mitigation: 'Clause d\'agrément équilibrée' }
                    ].map((risk, index) => (
                      <div key={index} className="bg-amber-900/20 border border-amber-700 rounded p-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-amber-300 font-medium">{risk.facteur}</span>
                          <div className="flex space-x-2">
                            <span className="text-xs text-amber-400">Impact: {risk.impact}/10</span>
                            <span className="text-xs text-amber-400">Prob: {risk.probabilite}/10</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex-1 bg-black/40 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-amber-500 to-red-500 h-2 rounded-full"
                              style={{ width: `${(risk.impact * risk.probabilite) / 10}%` }}
                            ></div>
                          </div>
                          <span className="text-amber-400 text-xs font-bold">
                            {((risk.impact * risk.probabilite) / 10).toFixed(0)}%
                          </span>
                        </div>
                        <div className="text-amber-200 text-xs">
                          <i className="ri-shield-line mr-1 text-green-400"></i>
                          Mitigation: {risk.mitigation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Guide complet SCI */}
            <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
              <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                <i className="ri-information-line mr-2"></i>
                Guide Complet de la SCI Familiale
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Principe et Fonctionnement</h5>
                  <p className="text-amber-100 mb-4">
                    La SCI (Société Civile Immobilière) est une structure juridique permettant à plusieurs personnes de détenir 
                    et gérer ensemble un patrimoine immobilier. Elle facilite la transmission progressive par donation de parts sociales.
                  </p>
                  <div className="bg-amber-900/20 p-3 rounded">
                    <p className="text-amber-200 text-sm mb-2"><strong>Constitution :</strong></p>
                    <ul className="text-amber-200 text-sm space-y-1 ml-4">
                      <li>• Minimum 2 associés (personnes physiques ou morales)</li>
                      <li>• Capital social librement fixé</li>
                      <li>• Statuts rédigés par acte sous seing privé ou notarié</li>
                      <li>• Immatriculation au RCS</li>
                      <li>• Publication d'une annonce légale</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Avantages Fiscaux</h5>
                  <ul className="space-y-2 text-amber-100 text-sm">
                    <li className="flex items-start">
                      <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Décote de 10 à 30% :</strong> Sur la valeur des parts lors de donations</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Transmission progressive :</strong> Donation de parts sans démembrer le bien</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Abattements renouvelables :</strong> 100 000 € par enfant tous les 15 ans</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Transparence fiscale :</strong> À l'IR, pas d'impôt au niveau de la société</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Optimisation IFI :</strong> Possibilité de déduire les dettes</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Clauses Statutaires Protectrices</h5>
                  <ul className="space-y-2 text-amber-100 text-sm">
                    <li className="flex items-start">
                      <i className="ri-shield-check-line text-green-400 mr-2 mt-1"></i>
                      <span><strong>Clause d'agrément :</strong> Contrôle des cessions de parts à des tiers</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-shield-check-line text-green-400 mr-2 mt-1"></i>
                      <span><strong>Clause d'inaliénabilité temporaire :</strong> Interdiction de vendre pendant X années</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-shield-check-line text-green-400 mr-2 mt-1"></i>
                      <span><strong>Clause de préemption :</strong> Droit de priorité pour les autres associés</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-shield-check-line text-green-400 mr-2 mt-1"></i>
                      <span><strong>Clause d'exclusion :</strong> Possibilité d'exclure un associé défaillant</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Points d'Attention</h5>
                  <ul className="space-y-2 text-amber-100 text-sm">
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Comptabilité obligatoire :</strong> Tenue d'une comptabilité et dépôt annuel</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Assemblées générales :</strong> AG annuelle obligatoire avec PV</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Coûts de gestion :</strong> Expert-comptable, frais bancaires, etc.</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Risque de mésentente :</strong> Conflits possibles entre associés</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Liquidité réduite :</strong> Parts moins liquides qu'un bien en direct</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Stratégies avancées SCI */}
            <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-2 border-amber-500 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-lightbulb-line text-black text-2xl"></i>
                </div>
                <div>
                  <h5 className="text-xl font-bold text-amber-300 mb-3">Stratégies Avancées SCI</h5>
                  <ul className="space-y-2 text-amber-100">
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>SCI + Démembrement :</strong> Donner la nue-propriété des parts en conservant l'usufruit. Double décote (SCI + démembrement) = économie maximale</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Donation progressive :</strong> Transmettre 100 parts tous les 15 ans pour profiter du renouvellement des abattements</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>SCI à capital variable :</strong> Facilite l'entrée et la sortie d'associés sans modification des statuts</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Apport-cession :</strong> Apporter un bien à la SCI puis vendre les parts avec report d'imposition de la plus-value</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>SCI holding :</strong> Créer une SCI qui détient des parts d'autres SCI pour une gestion centralisée</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Clause de tontine :</strong> Attribution automatique des parts au dernier survivant (entre époux)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'lmnp':
        return (
          <div className="space-y-6" key="lmnp-content">
            {/* Boutons fonctionnalités ULTRA-AVANCÉES */}
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-2 border-purple-500/50 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <i className="ri-cpu-line text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-purple-400">Fonctionnalités IA Ultra-Avancées</h4>
                  <p className="text-purple-300/70 text-xs">Analyse prédictive et optimisation par intelligence artificielle</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                <button
                  onClick={() => setShowMonteCarloSimulation(!showMonteCarloSimulation)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showMonteCarloSimulation
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-bar-chart-box-line mr-1"></i>
                  Monte Carlo
                </button>
                <button
                  onClick={() => setShowAIOptimizer(!showAIOptimizer)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showAIOptimizer
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-brain-line mr-1"></i>
                  IA Optimizer
                </button>
                <button
                  onClick={() => setShowScenarioBuilder(!showScenarioBuilder)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showScenarioBuilder
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-settings-3-line mr-1"></i>
                  Scénarios
                </button>
                <button
                  onClick={() => setShowPredictiveAnalytics(!showPredictiveAnalytics)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showPredictiveAnalytics
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-time-line mr-1"></i>
                  Prédictif
                </button>
                <button
                  onClick={() => setShowCashFlowWaterfall(!showCashFlowWaterfall)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showCashFlowWaterfall
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-water-flash-line mr-1"></i>
                  Waterfall
                </button>
                <button
                  onClick={() => setShowBenchmarking(!showBenchmarking)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showBenchmarking
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-trophy-line mr-1"></i>
                  Benchmark
                </button>
              </div>
            </div>

            {/* Boutons standards */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setShowProjection(!showProjection)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showProjection
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <i className="ri-line-chart-line mr-2"></i>
                {showProjection ? 'Masquer' : 'Afficher'} Projection 20 ans
              </button>
              <button
                onClick={() => setShowComparison(!showComparison)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showComparison
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <i className="ri-bar-chart-grouped-line mr-2"></i>
                {showComparison ? 'Masquer' : 'Afficher'} Micro-BIC vs Réel
              </button>
              <button
                onClick={() => setShowOptimizer(!showOptimizer)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showOptimizer
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <i className="ri-magic-line mr-2"></i>
                {showOptimizer ? 'Masquer' : 'Afficher'} Optimiseur Intelligent
              </button>
            </div>

            {/* Calculateur principal LMNP */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-home-smile-line mr-2"></i>
                  Paramètres LMNP
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Prix d'achat du bien</label>
                    <input
                      type="number"
                      value={prixAchatLMNP}
                      onChange={(e) => setPrixAchatLMNP(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Valeur du mobilier</label>
                    <input
                      type="number"
                      value={prixAchatLMNP * 0.15}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100"
                      readOnly
                    />
                    <p className="text-amber-300 text-xs mt-1">Estimé à 15% du prix d'achat</p>
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Loyer mensuel</label>
                    <input
                      type="number"
                      value={loyerMensuel}
                      onChange={(e) => setLoyerMensuel(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Charges annuelles</label>
                    <input
                      type="number"
                      value={chargesAnnuelles}
                      onChange={(e) => setChargesAnnuelles(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Régime fiscal</label>
                    <select
                      defaultValue="reel"
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 pr-8 text-amber-100 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="reel">Réel simplifié (recommandé)</option>
                      <option value="micro">Micro-BIC (abattement 50%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Tranche marginale d'imposition (%)</label>
                    <select
                      defaultValue="30"
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 pr-8 text-amber-100 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="11">11%</option>
                      <option value="30">30%</option>
                      <option value="41">41%</option>
                      <option value="45">45%</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Avantages LMNP</h5>
                  <ul className="space-y-2 text-amber-100 text-sm">
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-green-400 mr-2 mt-1"></i>
                      <span>Amortissement du bien et du mobilier</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-green-400 mr-2 mt-1"></i>
                      <span>Revenus locatifs peu ou pas imposés</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-green-400 mr-2 mt-1"></i>
                      <span>Récupération de la TVA possible</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-green-400 mr-2 mt-1"></i>
                      <span>Pas de plafond de loyers</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-file-list-3-line mr-2"></i>
                  Résultats - Régime Réel Simplifié
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Revenus bruts annuels</div>
                    <div className="text-2xl font-bold text-amber-400">{lmnpResult.revenuBrut.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Revenus nets (après charges)</div>
                    <div className="text-2xl font-bold text-amber-400">{lmnpResult.revenuNet.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Amortissement annuel</div>
                    <div className="text-2xl font-bold text-green-400">-{lmnpResult.amortissementAnnuel.toLocaleString('fr-FR')} €</div>
                    <div className="text-amber-300 text-xs mt-1">Bien amorti sur {dureeAmortissement} ans</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Résultat fiscal</div>
                    <div className="text-2xl font-bold text-amber-400">{lmnpResult.resultatFiscal.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Impôt à payer (TMI 30% + PS 17,2%)</div>
                    <div className="text-2xl font-bold text-red-400">{lmnpResult.impotReel.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 border-2 border-green-500 rounded-lg p-4">
                    <div className="text-green-300 text-sm mb-1">💰 Économie vs Micro-BIC</div>
                    <div className="text-3xl font-bold text-green-400">{lmnpResult.economieImpot.toLocaleString('fr-FR')} €/an</div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-900/60 to-amber-700/60 border-2 border-amber-400 rounded-lg p-4">
                    <div className="text-amber-200 text-sm mb-1">Cash-flow net annuel</div>
                    <div className="text-3xl font-bold text-amber-300">{lmnpResult.cashFlowNet.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Rentabilité nette</div>
                    <div className="text-2xl font-bold text-amber-400">{lmnpResult.rentabiliteNette.toFixed(2)} %</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparaison Micro-BIC vs Réel */}
            {showComparison && (
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-bar-chart-grouped-line mr-2"></i>
                  Comparaison Micro-BIC vs Réel Simplifié
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-5">
                    <h5 className="text-xl font-bold text-amber-400 mb-4">Micro-BIC (Abattement 50%)</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-amber-300">Revenus bruts</span>
                        <span className="text-amber-400 font-bold">{lmnpResult.revenuBrut.toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-300">Abattement forfaitaire (50%)</span>
                        <span className="text-green-400 font-bold">-{(lmnpResult.revenuBrut * 0.5).toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-300">Base imposable</span>
                        <span className="text-amber-400 font-bold">{(lmnpResult.revenuBrut * 0.5).toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-300">Impôt (TMI 30% + PS 17,2%)</span>
                        <span className="text-red-400 font-bold text-lg">{lmnpResult.impotMicroBIC.toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="border-t border-amber-700 pt-3 flex justify-between items-center">
                        <span className="text-amber-300 font-bold">Cash-flow net</span>
                        <span className="text-amber-400 font-bold text-xl">{(lmnpResult.revenuBrut - lmnpResult.impotMicroBIC).toLocaleString('fr-FR')} €</span>
                      </div>
                    </div>
                    <div className="mt-4 bg-amber-900/20 p-3 rounded">
                      <p className="text-amber-200 text-xs">
                        <strong>Avantages :</strong> Simplicité, pas de comptabilité complexe
                      </p>
                      <p className="text-amber-200 text-xs mt-1">
                        <strong>Inconvénients :</strong> Pas d'amortissement, fiscalité plus lourde
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-2 border-amber-500 rounded-lg p-5 shadow-lg shadow-amber-500/20">
                    <h5 className="text-xl font-bold text-amber-300 mb-4">Réel Simplifié (Recommandé)</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-amber-300">Revenus bruts</span>
                        <span className="text-amber-400 font-bold">{lmnpResult.revenuBrut.toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-300">Charges réelles</span>
                        <span className="text-red-400 font-bold">-{chargesAnnuelles.toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-300">Amortissement</span>
                        <span className="text-green-400 font-bold">-{lmnpResult.amortissementAnnuel.toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-300">Résultat fiscal</span>
                        <span className="text-amber-400 font-bold">{lmnpResult.resultatFiscal.toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-300">Impôt (TMI 30% + PS 17,2%)</span>
                        <span className="text-red-400 font-bold text-lg">{lmnpResult.impotReel.toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="border-t border-amber-500 pt-3 flex justify-between items-center">
                        <span className="text-amber-300 font-bold">Cash-flow net</span>
                        <span className="text-green-400 font-bold text-xl">{lmnpResult.cashFlowNet.toLocaleString('fr-FR')} €</span>
                      </div>
                    </div>
                    <div className="mt-4 bg-green-900/20 border border-green-500/30 p-3 rounded">
                      <p className="text-green-200 text-xs">
                        <strong>Avantages :</strong> Amortissement, charges réelles déductibles, fiscalité optimisée
                      </p>
                      <p className="text-green-200 text-xs mt-1">
                        <strong>Inconvénients :</strong> Comptabilité obligatoire, expert-comptable nécessaire
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 border-2 border-green-500 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-xl font-bold text-green-300 mb-2">💰 Gain annuel avec le Réel Simplifié</h5>
                      <p className="text-green-200 text-sm">Économie d'impôt par rapport au Micro-BIC</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-green-400">{lmnpResult.economieImpot.toLocaleString('fr-FR')} €</div>
                      <div className="text-green-300 text-sm mt-1">soit {((lmnpResult.economieImpot / lmnpResult.impotMicroBIC) * 100).toFixed(1)}% d'économie</div>
                    </div>
                  </div>
                  <div className="mt-4 bg-black/40 border border-green-700 rounded p-3">
                    <p className="text-green-200 text-sm">
                      <strong>Sur 20 ans :</strong> Économie totale de {(lmnpResult.economieImpot * 20).toLocaleString('fr-FR')} € 
                      (hors évolution des loyers et de la fiscalité)
                    </p>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={350} className="mt-6">
                  <BarChart data={[
                    { regime: 'Micro-BIC', revenuNet: lmnpResult.revenuBrut - lmnpResult.impotMicroBIC, impot: lmnpResult.impotMicroBIC },
                    { regime: 'Réel Simplifié', revenuNet: lmnpResult.cashFlowNet, impot: lmnpResult.impotReel }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#8B7355" />
                    <XAxis dataKey="regime" stroke="#D4AF37" />
                    <YAxis stroke="#D4AF37" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '2px solid #D4AF37', borderRadius: '8px' }}
                      labelStyle={{ color: '#D4AF37' }}
                      itemStyle={{ color: '#FFD700' }}
                    />
                    <Legend wrapperStyle={{ color: '#D4AF37' }} />
                    <Bar dataKey="revenuNet" fill="#4ADE80" name="Revenu net (€)" />
                    <Bar dataKey="impot" fill="#FF6B6B" name="Impôt (€)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Projection 20 ans */}
            {showProjection && (
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-line-chart-line mr-2"></i>
                  Projection sur 20 ans - Régime Réel Simplifié
                </h4>

                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={Array.from({ length: 21 }, (_, i) => {
                    const loyerAnnuelProjecte = lmnpResult.revenuBrut * Math.pow(1.02, i);
                    const chargesProjectees = chargesAnnuelles * Math.pow(1.015, i);
                    const revenuNetProjecte = loyerAnnuelProjecte - chargesProjectees;
                    const amortissement = i < dureeAmortissement ? lmnpResult.amortissementAnnuel : 0;
                    const resultatFiscal = Math.max(0, revenuNetProjecte - amortissement);
                    const impot = resultatFiscal * 0.472;
                    const cashFlow = revenuNetProjecte - impot;
                    const cashFlowCumule = cashFlow * i;
                    const valeurBien = prixAchatLMNP * Math.pow(1.02, i);
                    const plusValue = valeurBien - prixAchatLMNP;
                    
                    return {
                      annee: i,
                      revenusCumules: cashFlowCumule,
                      valeurBien,
                      plusValue,
                      patrimoineTotal: cashFlowCumule + valeurBien,
                      rendement: i > 0 ? ((cashFlowCumule + plusValue) / prixAchatLMNP) * 100 : 0
                    };
                  })}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#8B7355" />
                    <XAxis dataKey="annee" stroke="#D4AF37" label={{ value: 'Années', position: 'insideBottom', offset: -5, fill: '#D4AF37' }} />
                    <YAxis yAxisId="left" stroke="#D4AF37" label={{ value: 'Montant (€)', angle: -90, position: 'insideLeft', fill: '#D4AF37' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#4ADE80" label={{ value: 'Rendement (%)', angle: 90, position: 'insideRight', fill: '#4ADE80' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '2px solid #D4AF37', borderRadius: '8px' }}
                      labelStyle={{ color: '#D4AF37' }}
                      itemStyle={{ color: '#FFD700' }}
                    />
                    <Legend wrapperStyle={{ color: '#D4AF37' }} />
                    <Area yAxisId="left" type="monotone" dataKey="revenusCumules" fill="#4ADE80" fillOpacity={0.3} stroke="#4ADE80" name="Revenus cumulés" />
                    <Line yAxisId="left" type="monotone" dataKey="valeurBien" stroke="#D4AF37" strokeWidth={2} name="Valeur du bien" />
                    <Line yAxisId="left" type="monotone" dataKey="plusValue" stroke="#FFA500" strokeWidth={2} name="Plus-value" />
                    <Line yAxisId="left" type="monotone" dataKey="patrimoineTotal" stroke="#FF6B6B" strokeWidth={3} name="Patrimoine total" />
                    <Line yAxisId="right" type="monotone" dataKey="rendement" stroke="#4ADE80" strokeWidth={2} strokeDasharray="5 5" name="Rendement cumulé (%)" />
                  </ComposedChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Revenus cumulés</div>
                    <div className="text-green-400 font-bold text-sm">
                      {(lmnpResult.cashFlowNet * 20 * 1.2).toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Valeur du bien</div>
                    <div className="text-amber-400 font-bold text-sm">
                      {(prixAchatLMNP * Math.pow(1.02, 20)).toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Plus-value</div>
                    <div className="text-green-400 font-bold text-sm">
                      {((prixAchatLMNP * Math.pow(1.02, 20)) - prixAchatLMNP).toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Patrimoine total</div>
                    <div className="text-amber-400 font-bold text-sm">
                      {((lmnpResult.cashFlowNet * 20 * 1.2) + (prixAchatLMNP * Math.pow(1.02, 20))).toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Rendement</div>
                    <div className="text-green-400 font-bold text-sm">
                      {((((lmnpResult.cashFlowNet * 20 * 1.2) + ((prixAchatLMNP * Math.pow(1.02, 20)) - prixAchatLMNP)) / prixAchatLMNP) * 100).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Optimiseur intelligent */}
            {showOptimizer && (
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-magic-line mr-2"></i>
                  Optimiseur Intelligent LMNP - Top 3 Stratégies
                </h4>

                <div className="mb-6">
                  <label className="block text-amber-300 mb-2 font-medium">Tolérance au risque (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={toleranceRisque}
                    onChange={(e) => setToleranceRisque(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-amber-300 text-sm mt-1">
                    <span>Prudent</span>
                    <span className="font-bold text-amber-400">{toleranceRisque}/10</span>
                    <span>Audacieux</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { 
                      nom: 'Réel Simplifié + Amortissement Maximal', 
                      economie: lmnpResult.economieImpot * 20, 
                      complexite: 6, 
                      delai: 1, 
                      risque: 3,
                      flexibilite: 8,
                      scoreOptimise: 95,
                      description: 'Optimisation fiscale maximale grâce à l\'amortissement du bien et du mobilier sur 20-25 ans'
                    },
                    { 
                      nom: 'Micro-BIC Simplifié', 
                      economie: 0, 
                      complexite: 2, 
                      delai: 0, 
                      risque: 2,
                      flexibilite: 10,
                      scoreOptimise: 78,
                      description: 'Solution simple avec abattement forfaitaire de 50%, idéale pour petits investissements'
                    },
                    { 
                      nom: 'LMNP + Censi-Bouvard', 
                      economie: lmnpResult.economieImpot * 20 + 30000, 
                      complexite: 7, 
                      delai: 2, 
                      risque: 4,
                      flexibilite: 6,
                      scoreOptimise: 85,
                      description: 'Réduction d\'impôt de 11% du prix d\'achat (plafonné à 300 000 €) + amortissement LMNP'
                    }
                  ].map((strat, index) => (
                    <div key={index} className={`bg-gradient-to-r ${
                      index === 0 ? 'from-amber-900/40 to-amber-800/40 border-2 border-amber-500' :
                      index === 1 ? 'from-amber-900/30 to-amber-800/30 border-2 border-amber-600' :
                      'from-amber-900/20 to-amber-800/20 border border-amber-700'
                    } rounded-lg p-5`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {index === 0 && (
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
                              <i className="ri-trophy-line text-black text-xl"></i>
                            </div>
                          )}
                          {index === 1 && (
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                              <i className="ri-medal-line text-black text-xl"></i>
                            </div>
                          )}
                          {index === 2 && (
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-800 rounded-full flex items-center justify-center">
                              <i className="ri-award-line text-white text-xl"></i>
                            </div>
                          )}
                          <div>
                            <h5 className="text-lg font-bold text-amber-300">{strat.nom}</h5>
                            <p className="text-amber-400/70 text-sm">
                              {index === 0 ? '🏆 Recommandation optimale' : index === 1 ? '🥈 Solution simple' : '🥉 Bonus fiscal'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-amber-300 text-sm">Score optimisé</div>
                          <div className="text-2xl font-bold text-amber-400">{strat.scoreOptimise}/100</div>
                        </div>
                      </div>

                      <p className="text-amber-200 text-sm mb-4 italic">{strat.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Économie 20 ans</div>
                          <div className="text-green-400 font-bold text-sm">{strat.economie.toLocaleString('fr-FR')} €</div>
                        </div>
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Complexité</div>
                          <div className="text-amber-400 font-bold text-sm">{strat.complexite}/10</div>
                        </div>
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Délai</div>
                          <div className="text-amber-400 font-bold text-sm">{strat.delai} mois</div>
                        </div>
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Risque</div>
                          <div className="text-amber-400 font-bold text-sm">{strat.risque}/10</div>
                        </div>
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Flexibilité</div>
                          <div className="text-amber-400 font-bold text-sm">{strat.flexibilite}/10</div>
                        </div>
                      </div>

                      {index === 0 && (
                        <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded p-3">
                          <p className="text-amber-200 text-sm">
                            <i className="ri-lightbulb-line mr-2 text-amber-400"></i>
                            <strong>Pourquoi cette stratégie ?</strong> L\'amortissement permet de neutraliser fiscalement les revenus locatifs pendant 20 ans. 
                            Économie totale de {strat.economie.toLocaleString('fr-FR')} € sur 20 ans avec une gestion optimisée.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Analyse de risque LMNP */}
                <div className="mt-6 bg-black/40 border-2 border-amber-700 rounded-lg p-5">
                  <h5 className="text-lg font-bold text-amber-400 mb-4 flex items-center">
                    <i className="ri-shield-check-line mr-2"></i>
                    Analyse de Risque Détaillée LMNP
                  </h5>
                  <div className="space-y-3">
                    {[
                      { facteur: 'Vacance locative', impact: 8, probabilite: 5, mitigation: 'Emplacement premium, gestion locative professionnelle' },
                      { facteur: 'Travaux et entretien', impact: 6, probabilite: 8, mitigation: 'Provision pour travaux, garantie constructeur' },
                      { facteur: 'Requalification fiscale', impact: 3, probabilite: 2, mitigation: 'Respect strict des conditions LMNP, comptabilité rigoureuse' },
                      { facteur: 'Liquidité réduite', impact: 5, probabilite: 6, mitigation: 'Horizon d\'investissement long terme, épargne de précaution' },
                      { facteur: 'Évolution du marché', impact: 7, probabilite: 4, mitigation: 'Diversification géographique, analyse de marché approfondie' }
                    ].map((risk, index) => (
                      <div key={index} className="bg-amber-900/20 border border-amber-700 rounded p-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-amber-300 font-medium">{risk.facteur}</span>
                          <div className="flex space-x-2">
                            <span className="text-xs text-amber-400">Impact: {risk.impact}/10</span>
                            <span className="text-xs text-amber-400">Prob: {risk.probabilite}/10</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex-1 bg-black/40 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-amber-500 to-red-500 h-2 rounded-full"
                              style={{ width: `${(risk.impact * risk.probabilite) / 10}%` }}
                            ></div>
                          </div>
                          <span className="text-amber-400 text-xs font-bold">
                            {((risk.impact * risk.probabilite) / 10).toFixed(0)}%
                          </span>
                        </div>
                        <div className="text-amber-200 text-xs">
                          <i className="ri-shield-line mr-1 text-green-400"></i>
                          Mitigation: {risk.mitigation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Guide complet LMNP */}
            <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
              <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                <i className="ri-information-line mr-2"></i>
                Guide Complet du Statut LMNP
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Principe et Fonctionnement</h5>
                  <p className="text-amber-100 mb-4">
                    Le statut de Loueur Meublé Non Professionnel (LMNP) permet de louer un bien meublé tout en bénéficiant 
                    d'avantages fiscaux importants, notamment l'amortissement du bien et du mobilier.
                  </p>
                  <div className="bg-amber-900/20 p-3 rounded">
                    <p className="text-amber-200 text-sm mb-2"><strong>Conditions :</strong></p>
                    <ul className="text-amber-200 text-sm space-y-1 ml-4">
                      <li>• Recettes locatives {'<'} 23 000 €/an OU {'<'} 50% des revenus globaux</li>
                      <li>• Location meublée (liste officielle du mobilier)</li>
                      <li>• Déclaration au greffe du tribunal de commerce</li>
                      <li>• Choix entre Micro-BIC et Réel simplifié</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Avantages Fiscaux Détaillés</h5>
                  <ul className="space-y-2 text-amber-100 text-sm">
                    <li className="flex items-start">
                      <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Micro-BIC :</strong> Abattement forfaitaire de 50% sur les recettes (minimum 305 €)</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Réel simplifié :</strong> Déduction de toutes les charges réelles + amortissement</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Amortissement :</strong> Bien sur 25-30 ans, mobilier sur 5-7 ans</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Récupération TVA :</strong> Possible sur résidences de services neuves</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-star-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Plus-value :</strong> Exonération après 22 ans de détention (régime des particuliers)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Liste Officielle du Mobilier</h5>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <p className="text-amber-200 text-sm mb-2"><strong>Équipements obligatoires :</strong></p>
                    <div className="grid grid-cols-2 gap-2 text-amber-200 text-xs">
                      <div>
                        <p className="font-bold mb-1">Couchage :</p>
                        <ul className="ml-2">
                          <li>• Literie avec couette/couverture</li>
                          <li>• Oreillers et traversins</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold mb-1">Cuisine :</p>
                        <ul className="ml-2">
                          <li>• Plaques de cuisson</li>
                          <li>• Four/micro-ondes</li>
                          <li>• Réfrigérateur</li>
                          <li>• Vaisselle et ustensiles</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold mb-1">Séjour :</p>
                        <ul className="ml-2">
                          <li>• Table et chaises</li>
                          <li>• Étagères de rangement</li>
                          <li>• Luminaires</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold mb-1">Entretien :</p>
                        <ul className="ml-2">
                          <li>• Matériel d'entretien</li>
                          <li>• Volets/rideaux</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Points d'Attention</h5>
                  <ul className="space-y-2 text-amber-100 text-sm">
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Comptabilité :</strong> Expert-comptable recommandé pour le régime réel</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Déclaration :</strong> Inscription au RCS dans les 15 jours du début d'activité</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Passage en LMP :</strong> Si recettes {'>'} 23 000 € ET {'>'} 50% des revenus</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Amortissement :</strong> Ne crée pas de déficit imputable sur le revenu global</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Stratégies avancées LMNP */}
            <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-2 border-amber-500 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-lightbulb-line text-black text-2xl"></i>
                </div>
                <div>
                  <h5 className="text-xl font-bold text-amber-300 mb-3">Stratégies Avancées LMNP</h5>
                  <ul className="space-y-2 text-amber-100">
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>LMNP + Démembrement de propriété :</strong> Acheter la nue-propriété d'une résidence de services, récupérer la pleine propriété après 15-20 ans avec décote de 30-50%</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>LMNP en SCI à l'IS :</strong> Créer une SCI soumise à l'IS pour détenir le bien LMNP, optimisation fiscale et transmission facilitée</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>LMNP + Location courte durée (Airbnb) :</strong> Rendement locatif supérieur mais gestion plus intensive, attention aux règles locales</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>LMNP + Déficit foncier :</strong> Combiner LMNP sur un bien et déficit foncier sur un autre pour optimiser la fiscalité globale</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Passage en LMP :</strong> Si activité importante, passage en Loueur Meublé Professionnel pour bénéficier d'avantages supplémentaires (exonération IFI, plus-value professionnelle)</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>LMNP + Travaux de rénovation énergétique :</strong> Déduction des travaux + valorisation du bien + loyers plus élevés</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Exemple concret d'optimisation */}
            <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-6">
              <h5 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                <i className="ri-file-chart-line mr-2"></i>
                Exemple Concret d'Optimisation
              </h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-amber-900/20 border border-amber-700 rounded p-4">
                  <h6 className="font-bold text-amber-300 mb-3">Situation initiale</h6>
                  <ul className="text-amber-200 text-sm space-y-2">
                    <li>• Bien acheté : {prixAchatLMNP.toLocaleString('fr-FR')} €</li>
                    <li>• Mobilier : {(prixAchatLMNP * 0.15).toLocaleString('fr-FR')} €</li>
                    <li>• Loyer mensuel : {loyerMensuel.toLocaleString('fr-FR')} €</li>
                    <li>• Charges annuelles : {chargesAnnuelles.toLocaleString('fr-FR')} €</li>
                    <li>• TMI : 30%</li>
                  </ul>
                </div>

                <div className="bg-amber-900/20 border border-amber-700 rounded p-4">
                  <h6 className="font-bold text-amber-300 mb-3">Résultats</h6>
                  <div className="space-y-3">
                    <div>
                      <p className="text-red-400 text-sm mb-1">❌ Sans optimisation (Micro-BIC)</p>
                      <p className="text-amber-200 text-sm">Impôt annuel : {lmnpResult.impotMicroBIC.toLocaleString('fr-FR')} €</p>
                      <p className="text-amber-200 text-sm">Cash-flow net : {(lmnpResult.revenuBrut - lmnpResult.impotMicroBIC).toLocaleString('fr-FR')} €</p>
                    </div>
                    <div className="border-t border-amber-700 pt-3">
                      <p className="text-green-400 text-sm mb-1">✅ Avec optimisation (Réel Simplifié)</p>
                      <p className="text-amber-200 text-sm">Impôt annuel : {lmnpResult.impotReel.toLocaleString('fr-FR')} €</p>
                      <p className="text-amber-200 text-sm">Cash-flow net : {lmnpResult.cashFlowNet.toLocaleString('fr-FR')} €</p>
                    </div>
                    <div className="bg-green-900/20 border border-green-500/30 rounded p-3 mt-3">
                      <p className="text-green-300 font-bold">💰 Gain annuel : {lmnpResult.economieImpot.toLocaleString('fr-FR')} €</p>
                      <p className="text-green-300 text-sm">Sur 20 ans : {(lmnpResult.economieImpot * 20).toLocaleString('fr-FR')} €</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'scpi':
        return (
          <div className="space-y-6" key="scpi-content">
            {/* Boutons fonctionnalités ULTRA-AVANCÉES */}
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-2 border-purple-500/50 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <i className="ri-cpu-line text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-purple-400">Fonctionnalités IA Ultra-Avancées</h4>
                  <p className="text-purple-300/70 text-xs">Analyse prédictive et optimisation par intelligence artificielle</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                <button
                  onClick={() => setShowMonteCarloSimulation(!showMonteCarloSimulation)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showMonteCarloSimulation
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-bar-chart-box-line mr-1"></i>
                  Monte Carlo
                </button>
                <button
                  onClick={() => setShowAIOptimizer(!showAIOptimizer)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showAIOptimizer
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-brain-line mr-1"></i>
                  IA Optimizer
                </button>
                <button
                  onClick={() => setShowScenarioBuilder(!showScenarioBuilder)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showScenarioBuilder
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-settings-3-line mr-1"></i>
                  Scénarios
                </button>
                <button
                  onClick={() => setShowPredictiveAnalytics(!showPredictiveAnalytics)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showPredictiveAnalytics
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-time-line mr-1"></i>
                  Prédictif
                </button>
                <button
                  onClick={() => setShowCashFlowWaterfall(!showCashFlowWaterfall)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showCashFlowWaterfall
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-water-flash-line mr-1"></i>
                  Waterfall
                </button>
                <button
                  onClick={() => setShowBenchmarking(!showBenchmarking)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showBenchmarking
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-trophy-line mr-1"></i>
                  Benchmark
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {/* ... existing SCPI buttons ... */}
            </div>

            {/* ... existing SCPI content ... */}
          </div>
        );

      case 'deficit-foncier':
        return (
          <div className="space-y-6" key="deficit-content">
            {/* Boutons fonctionnalités ULTRA-AVANCÉES */}
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-2 border-purple-500/50 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <i className="ri-cpu-line text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-purple-400">Fonctionnalités IA Ultra-Avancées</h4>
                  <p className="text-purple-300/70 text-xs">Analyse prédictive et optimisation par intelligence artificielle</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                <button
                  onClick={() => setShowMonteCarloSimulation(!showMonteCarloSimulation)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showMonteCarloSimulation
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-bar-chart-box-line mr-1"></i>
                  Monte Carlo
                </button>
                <button
                  onClick={() => setShowAIOptimizer(!showAIOptimizer)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showAIOptimizer
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-brain-line mr-1"></i>
                  IA Optimizer
                </button>
                <button
                  onClick={() => setShowScenarioBuilder(!showScenarioBuilder)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showScenarioBuilder
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-settings-3-line mr-1"></i>
                  Scénarios
                </button>
                <button
                  onClick={() => setShowPredictiveAnalytics(!showPredictiveAnalytics)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showPredictiveAnalytics
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-time-line mr-1"></i>
                  Prédictif
                </button>
                <button
                  onClick={() => setShowCashFlowWaterfall(!showCashFlowWaterfall)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showCashFlowWaterfall
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-water-flash-line mr-1"></i>
                  Waterfall
                </button>
                <button
                  onClick={() => setShowBenchmarking(!showBenchmarking)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showBenchmarking
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-trophy-line mr-1"></i>
                  Benchmark
                </button>
              </div>
            </div>

            {/* Boutons standards */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setShowProjection(!showProjection)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showProjection
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <i className="ri-line-chart-line mr-2"></i>
                {showProjection ? 'Masquer' : 'Afficher'} Projection 20 ans
              </button>
              <button
                onClick={() => setShowComparison(!showComparison)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showComparison
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <i className="ri-bar-chart-grouped-line mr-2"></i>
                {showComparison ? 'Masquer' : 'Afficher'} Comparaison Stratégies
              </button>
              <button
                onClick={() => setShowOptimizer(!showOptimizer)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showOptimizer
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <i className="ri-magic-line mr-2"></i>
                {showOptimizer ? 'Masquer' : 'Afficher'} Optimiseur Intelligent
              </button>
            </div>

            {/* Calculateur principal Déficit Foncier */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-file-reduce-line mr-2"></i>
                  Paramètres Déficit Foncier
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Prix d'achat du bien</label>
                    <input
                      type="number"
                      value={prixAchatDeficit}
                      onChange={(e) => setPrixAchatDeficit(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Montant des travaux</label>
                    <input
                      type="number"
                      value={montantTravauxDeficit}
                      onChange={(e) => setMontantTravauxDeficit(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Durée des travaux (années)</label>
                    <input
                      type="number"
                      value={dureeTravauxDeficit}
                      onChange={(e) => setDureeTravauxDeficit(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Loyer mensuel après travaux</label>
                    <input
                      type="number"
                      value={loyerMensuelDeficit}
                      onChange={(e) => setLoyerMensuelDeficit(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Charges annuelles</label>
                    <input
                      type="number"
                      value={chargesAnnuellesDeficit}
                      onChange={(e) => setChargesAnnuellesDeficit(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Tranche marginale d'imposition (%)</label>
                    <select
                      value={TMIDeficit}
                      onChange={(e) => setTMIDeficit(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 pr-8 text-amber-100 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="11">11%</option>
                      <option value="30">30%</option>
                      <option value="41">41%</option>
                      <option value="45">45%</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Plafonds 2024</h5>
                  <div className="space-y-2 text-sm text-amber-100">
                    <div className="flex justify-between border-b border-amber-800 py-2">
                      <span>Imputation sur revenu global</span>
                      <span className="font-bold text-amber-400">10 700 €/an</span>
                    </div>
                    <div className="flex justify-between border-b border-amber-800 py-2">
                      <span>Travaux énergétiques (bonus)</span>
                      <span className="font-bold text-green-400">21 400 €/an</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Report du déficit</span>
                      <span className="font-bold text-amber-400">10 ans</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-file-list-3-line mr-2"></i>
                  Résultats du calcul
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Revenus locatifs bruts annuels</div>
                    <div className="text-2xl font-bold text-amber-400">{deficitResult.revenusBruts.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Travaux annuels</div>
                    <div className="text-2xl font-bold text-red-400">-{deficitResult.travauxAnnuels.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Déficit foncier annuel</div>
                    <div className="text-2xl font-bold text-amber-400">{deficitResult.deficitAnnuel.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 border-2 border-green-500 rounded-lg p-4">
                    <div className="text-green-300 text-sm mb-1">💰 Imputable sur revenu global</div>
                    <div className="text-3xl font-bold text-green-400">{deficitResult.deficitImputableRevenuGlobal.toLocaleString('fr-FR')} €</div>
                    <div className="text-green-300 text-xs mt-1">Plafonné à 10 700 €/an</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Déficit reportable (10 ans)</div>
                    <div className="text-2xl font-bold text-amber-400">{deficitResult.deficitReportable.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 border-2 border-green-500 rounded-lg p-4">
                    <div className="text-green-300 text-sm mb-1">💰 Économie d'impôt annuelle</div>
                    <div className="text-3xl font-bold text-green-400">{deficitResult.economieImpotAnnuelle.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-900/60 to-amber-700/60 border-2 border-amber-400 rounded-lg p-4">
                    <div className="text-amber-200 text-sm mb-1">Économie totale sur {dureeTravauxDeficit} ans</div>
                    <div className="text-3xl font-bold text-amber-300">{deficitResult.economieImpotTotale.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Cash-flow après travaux</div>
                    <div className="text-2xl font-bold text-green-400">{deficitResult.cashFlowApresTravaux.toLocaleString('fr-FR')} €/an</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projection 20 ans */}
            {showProjection && (
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-line-chart-line mr-2"></i>
                  Projection sur 20 ans - Déficit Foncier
                </h4>

                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={projectionDeficit}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#8B7355" />
                    <XAxis dataKey="annee" stroke="#D4AF37" label={{ value: 'Années', position: 'insideBottom', offset: -5, fill: '#D4AF37' }} />
                    <YAxis yAxisId="left" stroke="#D4AF37" label={{ value: 'Montant (€)', angle: -90, position: 'insideLeft', fill: '#D4AF37' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#4ADE80" label={{ value: 'Gain total (€)', angle: 90, position: 'insideRight', fill: '#4ADE80' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '2px solid #D4AF37', borderRadius: '8px' }}
                      labelStyle={{ color: '#D4AF37' }}
                      itemStyle={{ color: '#FFD700' }}
                    />
                    <Legend wrapperStyle={{ color: '#D4AF37' }} />
                    <Area yAxisId="left" type="monotone" dataKey="cumulEconomies" fill="#4ADE80" fillOpacity={0.3} stroke="#4ADE80" name="Économies d'impôt cumulées" />
                    <Line yAxisId="left" type="monotone" dataKey="cumulCashFlow" stroke="#D4AF37" strokeWidth={2} name="Cash-flow cumulé" />
                    <Line yAxisId="left" type="monotone" dataKey="valeurBien" stroke="#FFA500" strokeWidth={2} name="Valeur du bien" />
                    <Line yAxisId="right" type="monotone" dataKey="gainTotal" stroke="#FF6B6B" strokeWidth={3} name="Gain total" />
                  </ComposedChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Économies totales</div>
                    <div className="text-green-400 font-bold text-sm">
                      {projectionDeficit[20]?.cumulEconomies.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Cash-flow cumulé</div>
                    <div className="text-amber-400 font-bold text-sm">
                      {projectionDeficit[20]?.cumulCashFlow.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Valeur du bien</div>
                    <div className="text-amber-400 font-bold text-sm">
                      {projectionDeficit[20]?.valeurBien.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Gain total</div>
                    <div className="text-green-400 font-bold text-sm">
                      {projectionDeficit[20]?.gainTotal.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Rendement</div>
                    <div className="text-amber-400 font-bold text-sm">
                      {projectionDeficit[20]?.rendement.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Comparaison stratégies */}
            {showComparison && (
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-bar-chart-grouped-line mr-2"></i>
                  Comparaison Multi-Stratégies Déficit Foncier
                </h4>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={[
                      { nom: 'Sans travaux', economie: 0, investissement: prixAchatDeficit },
                      { nom: 'Travaux légers', economie: 15000, investissement: prixAchatDeficit + 30000 },
                      { nom: 'Déficit foncier optimal', economie: deficitResult.economieImpotTotale, investissement: deficitResult.investissementTotal },
                      { nom: 'Rénovation complète', economie: 35000, investissement: prixAchatDeficit + 100000 },
                      { nom: 'Déficit + Énergétique', economie: 45000, investissement: prixAchatDeficit + 120000 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#8B7355" />
                      <XAxis dataKey="nom" stroke="#D4AF37" angle={-15} textAnchor="end" height={100} />
                      <YAxis stroke="#D4AF37" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: '2px solid #D4AF37', borderRadius: '8px' }}
                        labelStyle={{ color: '#D4AF37' }}
                        itemStyle={{ color: '#FFD700' }}
                      />
                      <Legend wrapperStyle={{ color: '#D4AF37' }} />
                      <Bar dataKey="economie" fill="#4ADE80" name="Économie d'impôt (€)" />
                      <Bar dataKey="investissement" fill="#FF6B6B" name="Investissement total (€)" />
                    </BarChart>
                  </ResponsiveContainer>

                  <ResponsiveContainer width="100%" height={350}>
                    <ScatterChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="#8B7355" />
                      <XAxis dataKey="complexite" name="Complexité" stroke="#D4AF37" label={{ value: 'Complexité', position: 'insideBottom', offset: -5, fill: '#D4AF37' }} />
                      <YAxis dataKey="economie" name="Économie" stroke="#D4AF37" label={{ value: 'Économie (€)', angle: -90, position: 'insideLeft', fill: '#D4AF37' }} />
                      <ZAxis dataKey="delai" range={[100, 1000]} name="Délai" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: '2px solid #D4AF37', borderRadius: '8px' }}
                        labelStyle={{ color: '#D4AF37' }}
                        cursor={{ strokeDasharray: '3 3' }}
                      />
                      <Legend wrapperStyle={{ color: '#D4AF37' }} />
                      <Scatter name="Stratégies" data={[
                        { nom: 'Sans travaux', complexite: 1, economie: 0, delai: 0 },
                        { nom: 'Travaux légers', complexite: 3, economie: 15000, delai: 6 },
                        { nom: 'Déficit foncier optimal', complexite: 5, economie: deficitResult.economieImpotTotale, delai: dureeTravauxDeficit * 12 },
                        { nom: 'Rénovation complète', complexite: 7, economie: 35000, delai: 24 },
                        { nom: 'Déficit + Énergétique', complexite: 8, economie: 45000, delai: 30 }
                      ]} fill="#D4AF37" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { nom: 'Sans travaux', economie: 0, complexite: 1, delai: 0, score: 3 },
                    { nom: 'Travaux légers (30k€)', economie: 15000, complexite: 3, delai: 6, score: 6 },
                    { nom: 'Déficit foncier optimal', economie: deficitResult.economieImpotTotale, complexite: 5, delai: dureeTravauxDeficit * 12, score: 9 },
                    { nom: 'Rénovation complète (100k€)', economie: 35000, complexite: 7, delai: 24, score: 8 },
                    { nom: 'Déficit + Énergétique', economie: 45000, complexite: 8, delai: 30, score: 9.5 }
                  ].map((strat, index) => (
                    <div key={index} className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                      <h5 className="text-lg font-bold text-amber-400 mb-3">{strat.nom}</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-amber-300">Économie</span>
                          <span className="text-green-400 font-bold">{strat.economie.toLocaleString('fr-FR')} €</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-amber-300">Complexité</span>
                          <div className="flex">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <div key={i} className={`w-2 h-4 mx-0.5 rounded ${i < strat.complexite ? 'bg-amber-500' : 'bg-amber-900/30'}`}></div>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-amber-300">Délai</span>
                          <span className="text-amber-400 font-bold">{strat.delai} mois</span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-amber-700">
                          <div className="flex justify-between items-center">
                            <span className="text-amber-300 font-bold">Score global</span>
                            <span className="text-amber-400 font-bold text-lg">{strat.score}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optimiseur intelligent */}
            {showOptimizer && (
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-magic-line mr-2"></i>
                  Optimiseur Intelligent Déficit Foncier - Top 3 Stratégies
                </h4>

                <div className="mb-6">
                  <label className="block text-amber-300 mb-2 font-medium">Tolérance au risque (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={toleranceRisque}
                    onChange={(e) => setToleranceRisque(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-amber-300 text-sm mt-1">
                    <span>Prudent</span>
                    <span className="font-bold text-amber-400">{toleranceRisque}/10</span>
                    <span>Audacieux</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { 
                      nom: 'Déficit Foncier + Travaux Énergétiques', 
                      economie: deficitResult.economieImpotTotale * 1.5, 
                      complexite: 7, 
                      delai: dureeTravauxDeficit * 12 + 6, 
                      risque: 4,
                      flexibilite: 7,
                      scoreOptimise: 95,
                      description: 'Plafond doublé à 21 400 €/an pour travaux de rénovation énergétique + économies d\'énergie futures'
                    },
                    { 
                      nom: 'Déficit Foncier Classique Optimisé', 
                      economie: deficitResult.economieImpotTotale, 
                      complexite: 5, 
                      delai: dureeTravauxDeficit * 12, 
                      risque: 3,
                      flexibilite: 8,
                      scoreOptimise: 88,
                      description: 'Travaux étalés sur plusieurs années pour maximiser l\'imputation annuelle de 10 700 €'
                    },
                    { 
                      nom: 'Déficit Foncier + Location Meublée', 
                      economie: deficitResult.economieImpotTotale + 15000, 
                      complexite: 8, 
                      delai: dureeTravauxDeficit * 12 + 12, 
                      risque: 5,
                      flexibilite: 6,
                      scoreOptimise: 82,
                      description: 'Déficit foncier pendant travaux puis passage en LMNP pour amortissement après rénovation'
                    }
                  ].map((strat, index) => (
                    <div key={index} className={`bg-gradient-to-r ${
                      index === 0 ? 'from-amber-900/40 to-amber-800/40 border-2 border-amber-500' :
                      index === 1 ? 'from-amber-900/30 to-amber-800/30 border-2 border-amber-600' :
                      'from-amber-900/20 to-amber-800/20 border border-amber-700'
                    } rounded-lg p-5`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {index === 0 && (
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
                              <i className="ri-trophy-line text-black text-xl"></i>
                            </div>
                          )}
                          {index === 1 && (
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                              <i className="ri-medal-line text-black text-xl"></i>
                            </div>
                          )}
                          {index === 2 && (
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-800 rounded-full flex items-center justify-center">
                              <i className="ri-award-line text-white text-xl"></i>
                            </div>
                          )}
                          <div>
                            <h5 className="text-lg font-bold text-amber-300">{strat.nom}</h5>
                            <p className="text-amber-400/70 text-sm">
                              {index === 0 ? '🏆 Recommandation optimale' : index === 1 ? '🥈 Excellente alternative' : '🥉 Stratégie avancée'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-amber-300 text-sm">Score optimisé</div>
                          <div className="text-2xl font-bold text-amber-400">{strat.scoreOptimise}/100</div>
                        </div>
                      </div>

                      <p className="text-amber-200 text-sm mb-4 italic">{strat.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Économie totale</div>
                          <div className="text-green-400 font-bold text-sm">{strat.economie.toLocaleString('fr-FR')} €</div>
                        </div>
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Complexité</div>
                          <div className="text-amber-400 font-bold text-sm">{strat.complexite}/10</div>
                        </div>
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Délai</div>
                          <div className="text-amber-400 font-bold text-sm">{strat.delai} mois</div>
                        </div>
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Risque</div>
                          <div className="text-amber-400 font-bold text-sm">{strat.risque}/10</div>
                        </div>
                        <div className="bg-black/40 border border-amber-700 rounded p-2">
                          <div className="text-amber-300 text-xs">Flexibilité</div>
                          <div className="text-amber-400 font-bold text-sm">{strat.flexibilite}/10</div>
                        </div>
                      </div>

                      {index === 0 && (
                        <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded p-3">
                          <p className="text-amber-200 text-sm">
                            <i className="ri-lightbulb-line mr-2 text-amber-400"></i>
                            <strong>Pourquoi cette stratégie ?</strong> Les travaux de rénovation énergétique bénéficient d'un plafond doublé (21 400 €/an au lieu de 10 700 €), 
                            permettant une économie d'impôt maximale. Économie totale de {strat.economie.toLocaleString('fr-FR')} € + réduction des charges énergétiques futures.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Analyse de risque */}
                <div className="mt-6 bg-black/40 border-2 border-amber-700 rounded-lg p-5">
                  <h5 className="text-lg font-bold text-amber-400 mb-4 flex items-center">
                    <i className="ri-shield-check-line mr-2"></i>
                    Analyse de Risque Détaillée Déficit Foncier
                  </h5>
                  <div className="space-y-3">
                    {[
                      { facteur: 'Dépassement budget travaux', impact: 7, probabilite: 6, mitigation: 'Devis détaillés, marge de sécurité 15%, suivi rigoureux' },
                      { facteur: 'Délais de chantier prolongés', impact: 6, probabilite: 7, mitigation: 'Planning réaliste, pénalités de retard, entreprises fiables' },
                      { facteur: 'Vacance locative post-travaux', impact: 5, probabilite: 4, mitigation: 'Emplacement premium, prix de marché, mandat de gestion' },
                      { facteur: 'Requalification fiscale', impact: 8, probabilite: 2, mitigation: 'Respect strict des règles, conservation 3 ans minimum, justificatifs' },
                      { facteur: 'Évolution législative', impact: 6, probabilite: 5, mitigation: 'Diversification stratégies, veille juridique, conseil expert' }
                    ].map((risk, index) => (
                      <div key={index} className="bg-amber-900/20 border border-amber-700 rounded p-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-amber-300 font-medium">{risk.facteur}</span>
                          <div className="flex space-x-2">
                            <span className="text-xs text-amber-400">Impact: {risk.impact}/10</span>
                            <span className="text-xs text-amber-400">Prob: {risk.probabilite}/10</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex-1 bg-black/40 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-amber-500 to-red-500 h-2 rounded-full"
                              style={{ width: `${(risk.impact * risk.probabilite) / 10}%` }}
                            ></div>
                          </div>
                          <span className="text-amber-400 text-xs font-bold">
                            {((risk.impact * risk.probabilite) / 10).toFixed(0)}%
                          </span>
                        </div>
                        <div className="text-amber-200 text-xs">
                          <i className="ri-shield-line mr-1 text-green-400"></i>
                          Mitigation: {risk.mitigation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Guide complet */}
            <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
              <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                <i className="ri-information-line mr-2"></i>
                Guide Complet du Déficit Foncier
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Principe et Fonctionnement</h5>
                  <p className="text-amber-100 mb-4">
                    Le déficit foncier permet de déduire les travaux de rénovation de vos revenus fonciers, et si le déficit est supérieur aux revenus, 
                    de l'imputer sur votre revenu global dans la limite de 10 700 € par an (21 400 € pour travaux énergétiques).
                  </p>
                  <div className="bg-amber-900/20 p-3 rounded">
                    <p className="text-amber-200 text-sm mb-2"><strong>Mécanisme :</strong></p>
                    <ul className="text-amber-200 text-sm space-y-1 ml-4">
                      <li>• Revenus fonciers - Charges - Travaux = Déficit</li>
                      <li>• Déficit imputable sur revenu global : 10 700 €/an</li>
                      <li>• Déficit imputable sur revenu global (énergétique) : 21 400 €/an</li>
                      <li>• Excédent reportable sur revenus fonciers : 10 ans</li>
                      <li>• Engagement de location : 3 ans minimum</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Travaux Éligibles</h5>
                  <ul className="space-y-2 text-amber-100 text-sm">
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-green-400 mr-2 mt-1"></i>
                      <span><strong>Réparation et entretien :</strong> Remise en état, ravalement, toiture</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-green-400 mr-2 mt-1"></i>
                      <span><strong>Amélioration :</strong> Installation chauffage central, salle de bain, cuisine</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-green-400 mr-2 mt-1"></i>
                      <span><strong>Énergétique :</strong> Isolation, fenêtres double vitrage, chaudière performante</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Non éligibles :</strong> Construction, agrandissement, reconstruction</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Intérêts d'emprunt :</strong> Imputables uniquement sur revenus fonciers (pas sur revenu global)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Conditions et Obligations</h5>
                  <ul className="space-y-2 text-amber-100 text-sm">
                    <li className="flex items-start">
                      <i className="ri-alert-line text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Location nue obligatoire :</strong> Le bien doit être loué vide (pas meublé)</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-alert-line text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Engagement 3 ans :</strong> Location pendant 3 ans minimum après les travaux</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-alert-line text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Régime réel :</strong> Option pour le régime réel d'imposition obligatoire</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-alert-line text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Justificatifs :</strong> Conservation de toutes les factures pendant 6 ans</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Points d'Attention</h5>
                  <ul className="space-y-2 text-amber-100 text-sm">
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Plafonnement :</strong> 10 700 € max/an sur revenu global (hors énergétique)</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Report limité :</strong> Excédent reportable 10 ans sur revenus fonciers uniquement</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Incompatibilité :</strong> Pas cumulable avec dispositifs Pinel, Malraux, Monuments Historiques</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Risque de requalification :</strong> Si non-respect de l'engagement de location</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Stratégies avancées */}
            <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-2 border-amber-500 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-lightbulb-line text-black text-2xl"></i>
                </div>
                <div>
                  <h5 className="text-xl font-bold text-amber-300 mb-3">Stratégies Avancées Déficit Foncier</h5>
                  <ul className="space-y-2 text-amber-100">
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Étalement des travaux :</strong> Répartir les travaux sur 2-3 ans pour maximiser l'imputation annuelle de 10 700 € (économie optimale)</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Prioriser l'énergétique :</strong> Commencer par les travaux énergétiques pour bénéficier du plafond doublé (21 400 €/an)</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Déficit puis LMNP :</strong> Créer du déficit foncier pendant travaux, puis passer en meublé (LMNP) pour amortir après rénovation</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Achat + Travaux immédiat :</strong> Acheter un bien nécessitant des travaux pour créer immédiatement du déficit foncier</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Déficit sur plusieurs biens :</strong> Mutualiser les déficits de plusieurs biens pour optimiser l'imputation globale</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span><strong>Timing fiscal :</strong> Réaliser les travaux en fin d'année pour imputer le déficit sur l'année en cours</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Exemple concret */}
            <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-6">
              <h5 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                <i className="ri-file-chart-line mr-2"></i>
                Exemple Concret d'Optimisation
              </h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-amber-900/20 border border-amber-700 rounded p-4">
                  <h6 className="font-bold text-amber-300 mb-3">Situation</h6>
                  <ul className="text-amber-200 text-sm space-y-2">
                    <li>• Bien acheté : {prixAchatDeficit.toLocaleString('fr-FR')} €</li>
                    <li>• Travaux prévus : {montantTravauxDeficit.toLocaleString('fr-FR')} €</li>
                    <li>• Loyer mensuel : {loyerMensuelDeficit.toLocaleString('fr-FR')} €</li>
                    <li>• Charges annuelles : {chargesAnnuellesDeficit.toLocaleString('fr-FR')} €</li>
                    <li>• TMI : {TMIDeficit}%</li>
                    <li>• Durée travaux : {dureeTravauxDeficit} ans</li>
                  </ul>
                </div>

                <div className="bg-amber-900/20 border border-amber-700 rounded p-4">
                  <h6 className="font-bold text-amber-300 mb-3">Résultats</h6>
                  <div className="space-y-3">
                    <div>
                      <p className="text-red-400 text-sm mb-1">❌ Sans optimisation</p>
                      <p className="text-amber-200 text-sm">Impôt annuel : {((loyerMensuelDeficit * 12 - chargesAnnuellesDeficit) * (TMIDeficit / 100 + 0.172)).toLocaleString('fr-FR')} €</p>
                      <p className="text-amber-200 text-sm">Pas de déduction des travaux</p>
                    </div>
                    <div className="border-t border-amber-700 pt-3">
                      <p className="text-green-400 text-sm mb-1">✅ Avec déficit foncier</p>
                      <p className="text-amber-200 text-sm">Économie annuelle : {deficitResult.economieImpotAnnuelle.toLocaleString('fr-FR')} €</p>
                      <p className="text-amber-200 text-sm">Économie totale : {deficitResult.economieImpotTotale.toLocaleString('fr-FR')} €</p>
                    </div>
                    <div className="bg-green-900/20 border border-green-500/30 rounded p-3 mt-3">
                      <p className="text-green-300 font-bold">💰 Gain total : {deficitResult.economieImpotTotale.toLocaleString('fr-FR')} €</p>
                      <p className="text-green-300 text-sm">Sur {dureeTravauxDeficit} ans de travaux</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'malraux':
        return (
          <div className="space-y-6" key="malraux-content">
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setShowProjection(!showProjection)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showProjection
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <i className="ri-line-chart-line mr-2"></i>
                {showProjection ? 'Masquer' : 'Afficher'} Projection 20 ans
              </button>
              <button
                onClick={() => setShowComparison(!showComparison)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showComparison
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <i className="ri-bar-chart-grouped-line mr-2"></i>
                {showComparison ? 'Masquer' : 'Afficher'} Comparaison Taux
              </button>
              <button
                onClick={() => setShowOptimizer(!showOptimizer)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  showOptimizer
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <i className="ri-magic-line mr-2"></i>
                {showOptimizer ? 'Masquer' : 'Afficher'} Analyse Détaillée
              </button>
            </div>

            {/* Boutons fonctionnalités ULTRA-AVANCÉES */}
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-2 border-purple-500/50 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <i className="ri-cpu-line text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-purple-400">Fonctionnalités IA Ultra-Avancées</h4>
                  <p className="text-purple-300/70 text-xs">Analyse prédictive et optimisation par intelligence artificielle</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                <button
                  onClick={() => setShowMonteCarloSimulation(!showMonteCarloSimulation)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showMonteCarloSimulation
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-bar-chart-box-line mr-1"></i>
                  Monte Carlo
                </button>
                <button
                  onClick={() => setShowAIOptimizer(!showAIOptimizer)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showAIOptimizer
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-brain-line mr-1"></i>
                  IA Optimizer
                </button>
                <button
                  onClick={() => setShowScenarioBuilder(!showScenarioBuilder)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showScenarioBuilder
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-settings-3-line mr-1"></i>
                  Scénarios
                </button>
                <button
                  onClick={() => setShowPredictiveAnalytics(!showPredictiveAnalytics)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showPredictiveAnalytics
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-time-line mr-1"></i>
                  Prédictif
                </button>
                <button
                  onClick={() => setShowCashFlowWaterfall(!showCashFlowWaterfall)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showCashFlowWaterfall
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-water-flash-line mr-1"></i>
                  Waterfall
                </button>
                <button
                  onClick={() => setShowBenchmarking(!showBenchmarking)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    showBenchmarking
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30'
                  }`}
                >
                  <i className="ri-trophy-line mr-1"></i>
                  Benchmark
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-ancient-gate-line mr-2"></i>
                  Paramètres Loi Malraux
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Prix d'achat du bien</label>
                    <input
                      type="number"
                      value={prixAchatMalraux}
                      onChange={(e) => setPrixAchatMalraux(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Montant des travaux de restauration</label>
                    <input
                      type="number"
                      value={montantTravauxMalraux}
                      onChange={(e) => setMontantTravauxMalraux(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Durée des travaux (années)</label>
                    <input
                      type="number"
                      value={dureeTravauxMalraux}
                      onChange={(e) => setDureeTravauxMalraux(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Taux de réduction d'impôt</label>
                    <select
                      value={tauxReductionMalraux}
                      onChange={(e) => setTauxReductionMalraux(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 pr-8 text-amber-100 focus:border-amber-500 focus:outline-none"
                    >
                      <option value="30">30% (Secteur sauvegardé avec PSMV)</option>
                      <option value="22">22% (ZPPAUP/AVAP)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-amber-300 mb-2 font-medium">Loyer mensuel après travaux</label>
                    <input
                      type="number"
                      value={loyerMensuelMalraux}
                      onChange={(e) => setLoyerMensuelMalraux(Number(e.target.value))}
                      className="w-full bg-black/40 border-2 border-amber-700 rounded-lg px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6 bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Plafonds 2024</h5>
                  <div className="space-y-2 text-sm text-amber-100">
                    <div className="flex justify-between border-b border-amber-800 py-2">
                      <span>Plafond travaux</span>
                      <span className="font-bold text-amber-400">400 000 €</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span>Période</span>
                      <span className="font-bold text-amber-400">4 ans</span>
                    </div>
                  </div>
                  <p className="text-amber-300 text-xs mt-3">
                    Soit 100 000 € maximum de travaux par an
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-file-list-3-line mr-2"></i>
                  Résultats
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Montant travaux éligible</div>
                    <div className="text-2xl font-bold text-amber-400">{malrauxResult.plafondTravaux.toLocaleString('fr-FR')} €</div>
                    <div className="text-amber-300 text-xs mt-1">Plafonné à 400 000 € sur 4 ans</div>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 border-2 border-green-500 rounded-lg p-4">
                    <div className="text-green-300 text-sm mb-1">💰 Réduction d'impôt totale</div>
                    <div className="text-3xl font-bold text-green-400">{malrauxResult.reductionTotale.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Réduction annuelle</div>
                    <div className="text-2xl font-bold text-green-400">{malrauxResult.reductionAnnuelle.toLocaleString('fr-FR')} €/an</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Loyers annuels après travaux</div>
                    <div className="text-2xl font-bold text-amber-400">{malrauxResult.loyerAnnuel.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Impôt annuel sur revenus locatifs</div>
                    <div className="text-2xl font-bold text-red-400">{malrauxResult.impotAnnuel.toLocaleString('fr-FR')} €</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Cash-flow pendant travaux</div>
                    <div className="text-2xl font-bold text-amber-400">{malrauxResult.cashFlowPendantTravaux.toLocaleString('fr-FR')} €/an</div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <div className="text-amber-300 text-sm mb-1">Cash-flow après travaux</div>
                    <div className="text-2xl font-bold text-green-400">{malrauxResult.cashFlowApresTravaux.toLocaleString('fr-FR')} €/an</div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-900/60 to-amber-700/60 border-2 border-amber-400 rounded-lg p-4">
                    <div className="text-amber-200 text-sm mb-1">Rendement global estimé</div>
                    <div className="text-3xl font-bold text-amber-300">{malrauxResult.rendementGlobal.toFixed(2)} %</div>
                  </div>
                </div>
              </div>
            </div>

            {showProjection && (
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-line-chart-line mr-2"></i>
                  Projection sur 20 ans
                </h4>

                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={projectionMalraux}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#8B7355" />
                    <XAxis dataKey="annee" stroke="#D4AF37" label={{ value: 'Années', position: 'insideBottom', offset: -5, fill: '#D4AF37' }} />
                    <YAxis yAxisId="left" stroke="#D4AF37" label={{ value: 'Montant (€)', angle: -90, position: 'insideLeft', fill: '#D4AF37' }} />
                    <YAxis yAxisId="right" orientation="right" stroke="#4ADE80" label={{ value: 'Rendement (%)', angle: 90, position: 'insideRight', fill: '#4ADE80' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '2px solid #D4AF37', borderRadius: '8px' }}
                      labelStyle={{ color: '#D4AF37' }}
                      itemStyle={{ color: '#FFD700' }}
                    />
                    <Legend wrapperStyle={{ color: '#D4AF37' }} />
                    <Area yAxisId="left" type="monotone" dataKey="cumulReductions" fill="#4ADE80" fillOpacity={0.3} stroke="#4ADE80" name="Réductions d'impôt cumulées" />
                    <Line yAxisId="left" type="monotone" dataKey="cumulCashFlow" stroke="#D4AF37" strokeWidth={2} name="Cash-flow cumulé" />
                    <Line yAxisId="left" type="monotone" dataKey="valeurBien" stroke="#FFA500" strokeWidth={2} name="Valeur du bien" />
                    <Line yAxisId="left" type="monotone" dataKey="gainTotal" stroke="#FF6B6B" strokeWidth={3} name="Gain total" />
                    <Line yAxisId="right" type="monotone" dataKey="rendement" stroke="#4ADE80" strokeWidth={2} strokeDasharray="5 5" name="Rendement (%)" />
                  </ComposedChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Réductions totales</div>
                    <div className="text-green-400 font-bold text-sm">
                      {projectionMalraux[20]?.cumulReductions.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Cash-flow cumulé</div>
                    <div className="text-amber-400 font-bold text-sm">
                      {projectionMalraux[20]?.cumulCashFlow.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Valeur du bien</div>
                    <div className="text-amber-400 font-bold text-sm">
                      {projectionMalraux[20]?.valeurBien.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Gain total</div>
                    <div className="text-green-400 font-bold text-sm">
                      {projectionMalraux[20]?.gainTotal.toLocaleString('fr-FR')} €
                    </div>
                  </div>
                  <div className="bg-black/40 border border-amber-700 rounded p-3">
                    <div className="text-amber-300 text-xs mb-1">Rendement</div>
                    <div className="text-amber-400 font-bold text-sm">
                      {projectionMalraux[20]?.rendement.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showComparison && (
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-bar-chart-grouped-line mr-2"></i>
                  Comparaison Taux 22% vs 30%
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[22, 30].map((taux) => {
                    const plafond = Math.min(montantTravauxMalraux, 400000);
                    const reduction = plafond * (taux / 100);
                    const reductionAnnuelle = reduction / dureeTravauxMalraux;
                    const investTotal = prixAchatMalraux + montantTravauxMalraux;
                    const valeurFinale = investTotal * 1.30;
                    const gainTotal = reduction + (malrauxResult.cashFlowApresTravaux * 10) + (valeurFinale - investTotal);
                    
                    return (
                      <div key={taux} className={`bg-black/40 border-2 rounded-lg p-5 ${
                        tauxReductionMalraux === taux
                          ? 'border-amber-500 shadow-lg shadow-amber-500/20'
                          : 'border-amber-700'
                      }`}>
                        <h5 className="text-xl font-bold text-amber-400 mb-4">
                          Taux {taux}%
                        </h5>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-amber-300">Réduction totale</span>
                            <span className="text-green-400 font-bold text-lg">{reduction.toLocaleString('fr-FR')} €</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-amber-300">Par an</span>
                            <span className="text-green-400 font-bold">{reductionAnnuelle.toLocaleString('fr-FR')} €</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-amber-300">Investissement total</span>
                            <span className="text-amber-400 font-bold">{investTotal.toLocaleString('fr-FR')} €</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-amber-300">Valeur finale estimée</span>
                            <span className="text-green-400 font-bold">{valeurFinale.toLocaleString('fr-FR')} €</span>
                          </div>
                          <div className="border-t border-amber-700 pt-3 flex justify-between items-center">
                            <span className="text-amber-300 font-bold">Gain total estimé</span>
                            <span className="text-green-400 font-bold text-xl">{gainTotal.toLocaleString('fr-FR')} €</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-amber-300">Rendement</span>
                            <span className="text-amber-400 font-bold">{((gainTotal / investTotal) * 100).toFixed(2)}%</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 bg-amber-900/20 p-3 rounded">
                          <p className="text-amber-200 text-xs">
                            {taux === 30 
                              ? "Secteur sauvegardé avec Plan de Sauvegarde et de Mise en Valeur (PSMV) approuvé"
                              : "Zone de Protection du Patrimoine Architectural Urbain et Paysager (ZPPAUP) ou Aire de mise en Valeur de l'Architecture et du Patrimoine (AVAP)"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {showOptimizer && (
              <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
                <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                  <i className="ri-magic-line mr-2"></i>
                  Analyse Détaillée
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <h5 className="text-lg font-bold text-amber-300 mb-3">Phase Travaux ({dureeTravauxMalraux} ans)</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-amber-300">Travaux annuels</span>
                        <span className="text-red-400 font-bold">-{(montantTravauxMalraux / dureeTravauxMalraux).toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-amber-300">Réduction d'impôt</span>
                        <span className="text-green-400 font-bold">+{malrauxResult.reductionAnnuelle.toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="border-t border-amber-700 pt-2 flex justify-between items-center">
                        <span className="text-amber-300 font-bold">Cash-flow net</span>
                        <span className="text-amber-400 font-bold text-lg">{malrauxResult.cashFlowPendantTravaux.toLocaleString('fr-FR')} €/an</span>
                      </div>
                      <p className="text-amber-200 text-xs mt-2">
                        Pendant les travaux, vous bénéficiez de la réduction d'impôt qui compense une partie des dépenses
                      </p>
                    </div>
                  </div>

                  <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-4">
                    <h5 className="text-lg font-bold text-amber-300 mb-3">Phase Exploitation</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-amber-300">Loyers annuels</span>
                        <span className="text-green-400 font-bold">+{malrauxResult.loyerAnnuel.toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-amber-300">Charges</span>
                        <span className="text-red-400 font-bold">-{(malrauxResult.investissementTotal * 0.02).toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-amber-300">Impôts (TMI 41% + PS)</span>
                        <span className="text-red-400 font-bold">-{malrauxResult.impotAnnuel.toLocaleString('fr-FR')} €</span>
                      </div>
                      <div className="border-t border-amber-700 pt-2 flex justify-between items-center">
                        <span className="text-amber-300 font-bold">Cash-flow net</span>
                        <span className="text-green-400 font-bold text-lg">{malrauxResult.cashFlowApresTravaux.toLocaleString('fr-FR')} €/an</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-2 border-amber-500 rounded-lg p-5">
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Bilan Global</h5>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-black/40 border border-amber-700 rounded p-3">
                      <div className="text-amber-300 text-sm mb-1">Investissement total</div>
                      <div className="text-amber-400 font-bold text-lg">{malrauxResult.investissementTotal.toLocaleString('fr-FR')} €</div>
                    </div>
                    <div className="bg-black/40 border border-amber-700 rounded p-3">
                      <div className="text-amber-300 text-sm mb-1">Économie d'impôt</div>
                      <div className="text-green-400 font-bold text-lg">{malrauxResult.economieImpotTotale.toLocaleString('fr-FR')} €</div>
                    </div>
                    <div className="bg-black/40 border border-amber-700 rounded p-3">
                      <div className="text-amber-300 text-sm mb-1">Valeur finale</div>
                      <div className="text-green-400 font-bold text-lg">{malrauxResult.valeurFinale.toLocaleString('fr-FR')} €</div>
                    </div>
                    <div className="bg-black/40 border border-amber-700 rounded p-3">
                      <div className="text-amber-300 text-sm mb-1">Plus-value</div>
                      <div className="text-green-400 font-bold text-lg">{malrauxResult.plusValuePotentielle.toLocaleString('fr-FR')} €</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-amber-600 rounded-xl p-6">
              <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                <i className="ri-information-line mr-2"></i>
                Dispositif Malraux - Restauration du Patrimoine
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Principe</h5>
                  <p className="text-amber-100 mb-4">
                    La loi Malraux permet de bénéficier d'une réduction d'impôt importante en investissant dans la restauration 
                    d'immeubles situés dans des secteurs protégés. Les travaux doivent être validés par un Architecte des Bâtiments de France.
                  </p>
                  <div className="bg-amber-900/20 p-3 rounded">
                    <p className="text-amber-200 text-sm mb-2"><strong>Conditions :</strong></p>
                    <ul className="text-amber-200 text-sm space-y-1 ml-4">
                      <li>• Immeuble en secteur sauvegardé ou ZPPAUP/AVAP</li>
                      <li>• Travaux de restauration complète</li>
                      <li>• Autorisation de l'ABF obligatoire</li>
                      <li>• Location nue pendant 9 ans minimum</li>
                      <li>• Plafond : 400 000 € sur 4 ans</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-bold text-amber-300 mb-3">Travaux éligibles</h5>
                  <ul className="space-y-2 text-amber-100 text-sm">
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-green-400 mr-2 mt-1"></i>
                      <span><strong>Restauration complète :</strong> Toiture, façades, structures</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-green-400 mr-2 mt-1"></i>
                      <span><strong>Mise aux normes :</strong> Électricité, plomberie, chauffage</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-green-400 mr-2 mt-1"></i>
                      <span><strong>Aménagements intérieurs :</strong> Selon prescriptions ABF</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-error-warning-line text-red-400 mr-2 mt-1"></i>
                      <span><strong>Non éligibles :</strong> Agrandissement, construction neuve</span>
                    </li>
                  </ul>
                  
                  <div className="mt-4 bg-black/40 border border-amber-700 rounded p-3">
                    <h6 className="font-bold text-amber-300 mb-2">Secteurs éligibles</h6>
                    <ul className="text-amber-200 text-sm space-y-1">
                      <li>• <strong>30% :</strong> Secteur sauvegardé avec PSMV approuvé</li>
                      <li>• <strong>22% :</strong> ZPPAUP, AVAP avec programme de restauration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-2 border-amber-500 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-lightbulb-line text-black text-2xl"></i>
                </div>
                <div>
                  <h5 className="text-xl font-bold text-amber-300 mb-3">Stratégie Optimale</h5>
                  <ul className="space-y-2 text-amber-100">
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span>Privilégiez les secteurs à 30% pour maximiser la réduction d'impôt (jusqu'à 120 000 €)</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span>Vérifiez l'éligibilité du secteur auprès de la mairie avant tout engagement</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span>Faites valider le projet par l'ABF en amont pour éviter les mauvaises surprises</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span>Étalez les travaux sur 3-4 ans pour optimiser la réduction d'impôt annuelle</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span>Idéal pour les très hauts revenus (TMI 41-45%) : double avantage fiscal</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span>Attention aux délais : les travaux peuvent prendre plus de temps que prévu</span>
                    </li>
                    <li className="flex items-start">
                      <i className="ri-checkbox-circle-fill text-amber-400 mr-2 mt-1"></i>
                      <span>Forte plus-value potentielle grâce à la qualité de l'emplacement et du patrimoine</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-black/40 border-2 border-amber-700 rounded-lg p-6">
              <h5 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                <i className="ri-alert-line mr-2"></i>
                Points d'Attention Importants
              </h5>
              <ul className="space-y-3 text-amber-100">
                <li className="flex items-start">
                  <i className="ri-error-warning-line text-red-400 mr-2 mt-1 flex-shrink-0"></i>
                  <span><strong className="text-amber-300">Contrôle strict :</strong> Tous les travaux doivent être validés et contrôlés par l'Architecte des Bâtiments de France</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-error-warning-line text-red-400 mr-2 mt-1 flex-shrink-0"></i>
                  <span><strong className="text-amber-300">Coûts élevés :</strong> Les travaux de restauration patrimoine sont souvent plus coûteux que des travaux classiques</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-error-warning-line text-red-400 mr-2 mt-1 flex-shrink-0"></i>
                  <span><strong className="text-amber-300">Délais longs :</strong> Autorisations administratives et contraintes techniques peuvent rallonger les délais</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-error-warning-line text-red-400 mr-2 mt-1 flex-shrink-0"></i>
                  <span><strong className="text-amber-300">Engagement de location :</strong> 9 ans minimum en location nue, sous peine de remise en cause de l'avantage fiscal</span>
                </li>
                <li className="flex items-start">
                  <i className="ri-error-warning-line text-red-400 mr-2 mt-1 flex-shrink-0"></i>
                  <span><strong className="text-amber-300">Liquidité limitée :</strong> Marché de niche, revente potentiellement plus difficile</span>
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative bg-black rounded-2xl shadow-2xl overflow-hidden border border-amber-500/30">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,165,0,0.08),transparent_50%)]"></div>
      
      <div className="relative p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl blur-lg opacity-50"></div>
              <div className="relative w-14 h-14 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <i className="ri-vip-crown-line text-black text-2xl"></i>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent">
                Ingénierie Patrimoniale
              </h3>
              <p className="text-amber-300/80 text-sm mt-1">Solutions premium de gestion de patrimoine</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-full border border-amber-500/30">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            <span className="text-amber-400 text-sm font-medium">Système actif</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setActiveTab('succession')}
            className={`group relative px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap overflow-hidden ${
              activeTab === 'succession'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/50'
                : 'bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-400 hover:from-amber-500/20 hover:to-yellow-500/20 border border-amber-500/30'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <div className="relative flex items-center space-x-2">
              <i className="ri-parent-line text-lg"></i>
              <span className="font-semibold">Transmission & Succession</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('immobilier')}
            className={`group relative px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap overflow-hidden ${
              activeTab === 'immobilier'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/50'
                : 'bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-400 hover:from-amber-500/20 hover:to-yellow-500/20 border border-amber-500/30'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <div className="relative flex items-center space-x-2">
              <i className="ri-building-line text-lg"></i>
              <span className="font-semibold">Immobilier & SCI</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('cartographie')}
            className={`group relative px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap overflow-hidden ${
              activeTab === 'cartographie'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/50'
                : 'bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-400 hover:from-amber-500/20 hover:to-yellow-500/20 border border-amber-500/30'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <div className="relative flex items-center space-x-2">
              <i className="ri-map-2-line text-lg"></i>
              <span className="font-semibold">Cartographie Juridique</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('international')}
            className={`group relative px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap overflow-hidden ${
              activeTab === 'international'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg shadow-amber-500/50'
                : 'bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-400 hover:from-amber-500/20 hover:to-yellow-500/20 border border-amber-500/30'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <div className="relative flex items-center space-x-2">
              <i className="ri-global-line text-lg"></i>
              <span className="font-semibold">Consolidation Multi-appareils</span>
            </div>
          </button>
        </div>

        {activeTab === 'succession' && (
          <>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { id: 'calcul', icon: 'ri-calculator-line', label: 'Calcul des droits' },
                { id: 'optimisation', icon: 'ri-lightbulb-line', label: 'Optimisation' },
                { id: 'dutreil', icon: 'ri-building-2-line', label: 'Pacte Dutreil' },
                { id: 'demembrement', icon: 'ri-split-cells-horizontal', label: 'Démembrement' },
                { id: 'donation', icon: 'ri-gift-line', label: 'Donations' },
                { id: 'assurance-vie', icon: 'ri-shield-check-line', label: 'Assurance-vie' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSuccessionSubTab(tab.id as SuccessionSubTab)}
                  className={`group relative px-4 py-2.5 rounded-lg transition-all duration-300 text-sm whitespace-nowrap overflow-hidden ${
                    successionSubTab === tab.id
                      ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/50 shadow-lg shadow-amber-500/20'
                      : 'bg-amber-500/5 text-amber-400/70 hover:text-amber-300 hover:bg-amber-500/10 border border-amber-500/20'
                  }`}
                >
                  <div className="relative flex items-center space-x-2">
                    <i className={`${tab.icon}`}></i>
                    <span className="font-medium">{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
            {renderSuccessionContent()}
          </>
        )}

        {activeTab === 'immobilier' && (
          <>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { id: 'sci', icon: 'ri-building-4-line', label: 'SCI Familiale' },
                { id: 'lmnp', icon: 'ri-home-smile-line', label: 'LMNP' },
                { id: 'scpi', icon: 'ri-community-line', label: 'SCPI' },
                { id: 'deficit-foncier', icon: 'ri-file-reduce-line', label: 'Déficit foncier' },
                { id: 'malraux', icon: 'ri-ancient-gate-line', label: 'Loi Malraux' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setImmobilierSubTab(tab.id as ImmobilierSubTab)}
                  className={`group relative px-4 py-2.5 rounded-lg transition-all duration-300 text-sm whitespace-nowrap overflow-hidden ${
                    immobilierSubTab === tab.id
                      ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/50 shadow-lg shadow-amber-500/20'
                      : 'bg-amber-500/5 text-amber-400/70 hover:text-amber-300 hover:bg-amber-500/10 border border-amber-500/20'
                  }`}
                >
                  <div className="relative flex items-center space-x-2">
                    <i className={`${tab.icon}`}></i>
                    <span className="font-medium">{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
            {renderImmobilierContent()}
          </>
        )}

        {activeTab === 'cartographie' && (
          <div className="space-y-6">
            {selectedLegalTheme ? (
              <div className="space-y-6">
                {/* Header avec retour */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => setSelectedLegalTheme(null)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <i className="ri-arrow-left-line text-xl"></i>
                    <span>Retour à la cartographie</span>
                  </button>
                  <div className={`flex items-center space-x-3 px-4 py-2 rounded-xl ${legalThemes.find(t => t.id === selectedLegalTheme)?.bgColor} border ${legalThemes.find(t => t.id === selectedLegalTheme)?.borderColor}`}>
                    <div className={`w-10 h-10 bg-gradient-to-br ${legalThemes.find(t => t.id === selectedLegalTheme)?.color} rounded-lg flex items-center justify-center`}>
                      <i className={`${legalThemes.find(t => t.id === selectedLegalTheme)?.icon} text-xl text-white`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-white">{legalThemes.find(t => t.id === selectedLegalTheme)?.title}</h3>
                  </div>
                </div>

                {/* Introduction */}
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-gray-700/50">
                  <p className="text-gray-300 text-lg leading-relaxed">{legalThemes.find(t => t.id === selectedLegalTheme)?.content.intro}</p>
                </div>

                {/* Sections de contenu */}
                <div className="grid grid-cols-1 gap-6">
                  {legalThemes.find(t => t.id === selectedLegalTheme)?.content.sections.map((section, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/30">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                        <div className={`w-8 h-8 bg-gradient-to-br ${legalThemes.find(t => t.id === selectedLegalTheme)?.color} rounded-lg flex items-center justify-center mr-3`}>
                          <span className="text-white font-bold text-sm">{idx + 1}</span>
                        </div>
                        {section.title}
                      </h4>
                      <div className="space-y-3">
                        {section.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start space-x-3 group">
                            <div className="mt-1">
                              <i className={`ri-checkbox-circle-line text-lg bg-gradient-to-br ${legalThemes.find(t => t.id === selectedLegalTheme)?.color} bg-clip-text text-transparent`}></i>
                            </div>
                            <p className="text-gray-300 group-hover:text-white transition-colors flex-1">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Conseils pratiques */}
                <div className={`bg-gradient-to-br ${legalThemes.find(t => t.id === selectedLegalTheme)?.bgColor} rounded-xl p-6 border ${legalThemes.find(t => t.id === selectedLegalTheme)?.borderColor}`}>
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                    <i className="ri-lightbulb-line text-xl text-yellow-400 mr-2"></i>
                    Conseils Pratiques
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {legalThemes.find(t => t.id === selectedLegalTheme)?.content.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start space-x-2 bg-gray-800/30 rounded-lg p-3">
                        <span className="text-lg">{tip.split(' ')[0]}</span>
                        <p className="text-gray-300 text-sm flex-1">{tip.substring(tip.indexOf(' ') + 1)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center space-x-4">
                  <button className={`bg-gradient-to-r ${legalThemes.find(t => t.id === selectedLegalTheme)?.color} hover:opacity-90 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2`}>
                    <i className="ri-download-line text-xl"></i>
                    <span>Télécharger le guide PDF</span>
                  </button>
                  <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 border border-gray-600 flex items-center space-x-2">
                    <i className="ri-calendar-line text-xl"></i>
                    <span>Prendre RDV avec un expert</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Introduction */}
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-3 flex items-center">
                        <i className="ri-map-2-line mr-3 text-yellow-400"></i>
                        Cartographie Juridique Interactive
                      </h3>
                      <p className="text-gray-400 text-lg">
                        Explorez les différentes thématiques juridiques en cliquant sur les cartes ci-dessous
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-medium">{legalThemes.length} thématiques disponibles</span>
                    </div>
                  </div>
                </div>

                {/* Grille de cartes thématiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {legalThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedLegalTheme(theme.id)}
                      className={`group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border ${theme.borderColor} ${theme.hoverBorder} transition-all duration-300 hover:scale-105 hover:shadow-2xl text-left overflow-hidden`}
                    >
                      {/* Effet de brillance au survol */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                      
                      {/* Contenu de la carte */}
                      <div className="relative z-10">
                        {/* Icône */}
                        <div className={`w-16 h-16 bg-gradient-to-br ${theme.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <i className={`${theme.icon} text-3xl text-white`}></i>
                        </div>

                        {/* Titre */}
                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                          {theme.title}
                        </h4>

                        {/* Description */}
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {theme.description}
                        </p>

                        {/* Badge nombre de sections */}
                        <div className={`inline-flex items-center space-x-2 ${theme.bgColor} px-3 py-1 rounded-full border ${theme.borderColor}`}>
                          <i className="ri-file-list-line text-sm"></i>
                          <span className="text-sm font-medium">{theme.content.sections.length} sections</span>
                        </div>

                        {/* Flèche */}
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <i className="ri-arrow-right-line text-2xl text-yellow-400"></i>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-xl p-6 border border-purple-500/30">
                    <div className="flex items-center justify-between mb-3">
                      <i className="ri-book-line text-3xl text-purple-400"></i>
                      <span className="text-4xl font-bold text-white">150+</span>
                    </div>
                    <p className="text-gray-300 font-medium">Points juridiques couverts</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/30">
                    <div className="flex items-center justify-between mb-3">
                      <i className="ri-lightbulb-line text-3xl text-blue-400"></i>
                      <span className="text-4xl font-bold text-white">50+</span>
                    </div>
                    <p className="text-gray-300 font-medium">Conseils pratiques</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-6 border border-green-500/30">
                    <div className="flex items-center justify-between mb-3">
                      <i className="ri-refresh-line text-3xl text-green-400"></i>
                      <span className="text-4xl font-bold text-white">2024</span>
                    </div>
                    <p className="text-gray-300 font-medium">Mise à jour législative</p>
                  </div>
                </div>

                {/* Assistant IA */}
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-8 border border-gray-600/50 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <i className="ri-robot-line text-3xl text-white"></i>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">Assistant Juridique IA</h3>
                        <p className="text-gray-400">Posez vos questions juridiques en temps réel</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-medium">En ligne 24/7</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Ex: Comment optimiser ma succession avec 3 enfants ?"
                        className="w-full bg-gray-800/50 border border-gray-600/50 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 pr-12"
                      />
                      <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-300 transition-colors">
                        <i className="ri-send-plane-line text-2xl"></i>
                      </button>
                    </div>
                    <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap flex items-center space-x-2">
                      <i className="ri-mic-line text-xl"></i>
                      <span>Vocal</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm transition-colors border border-gray-600/30">
                      💰 Optimisation fiscale 2024
                    </button>
                    <button className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm transition-colors border border-gray-600/30">
                      🏠 Donation immobilière
                    </button>
                    <button className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm transition-colors border border-gray-600/30">
                      📄 Clause bénéficiaire assurance-vie
                    </button>
                    <button className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm transition-colors border border-gray-600/30">
                      🌍 Patrimoine international
                    </button>
                    <button className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm transition-colors border border-gray-600/30">
                      ⚖️ SCI familiale
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'international' && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl"></div>
            <div className="relative text-center py-20">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur-2xl opacity-30"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                  <i className="ri-global-line text-black text-5xl"></i>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-amber-400 mb-3">Consolidation Multi-appareils</h4>
              <p className="text-amber-300/70 text-lg max-w-md mx-auto">
                Cette fonctionnalité avancée sera bientôt disponible pour une gestion globale de votre patrimoine
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}