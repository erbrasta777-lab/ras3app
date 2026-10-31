import { Iteration, PriorityAction, RouteStage, RadarScores, MotorMeta, BICGovernance } from '../types';

export function generateFullProcess(
  name: string, 
  sector: string, 
  scale: string, 
  challenge: string, 
  customDesc?: string
): Iteration {
  let potencial = "";
  let realidad = "";
  let aciertos: string[] = [];
  let oportunidades_mejora: string[] = [];
  let estadoSuperior = "";
  let capacidadesADesarrollar = "";

  let administrativeKpiName = "";
  let humanKpiName = "";
  let sustainableKpiName = "";
  let adminBaseline = "";
  let adminTarget = "";
  let humanBaseline = "";
  let humanTarget = "";
  let sustainableBaseline = "";
  let sustainableTarget = "";
  
  let priorities: PriorityAction[] = [];
  let etapas: RouteStage[] = [];
  let realidadEsperada = "";
  let radarScores: RadarScores = {
    administrativa: 72,
    humana: 68,
    economica: 75,
    social: 70,
    ambiental: 80,
    cultural: 65
  };
  let motorMeta: MotorMeta;
  let bicGovernance: BICGovernance;

  // Normalize strings for easy matching
  const sectorLower = sector ? sector.toLowerCase() : "";

  // 1. Alimentos / Gastronomía / Agrícola
  if (sectorLower.includes("alimento") || sectorLower.includes("gastronom") || sectorLower.includes("agríc") || sectorLower.includes("agric")) {
    potencial = `${name} posee el valor latente para consolidarse como un referente de gastronomía regenerativa y producción alimentaria circular en la región, integrando el comercio justo con productores locales y optimizando la merma orgánica.`;
    realidad = customDesc || `Operación tradicional que reporta un promedio de 18% de desperdicio de insumos en almacén y cocina, fatiga del personal por turnos sin pausas activas programadas, y demoras en el balance de compras y ventas.`;
    aciertos = [
      "Calidad organoléptica superior y fidelidad comprobada de los comensales habituales.",
      "Vínculo directo con agricultores locales que proveen hortalizas y tubérculos frescos.",
      "Altos estándares sanitarios y vocación genuina de cocina artesanal."
    ];
    oportunidades_mejora = [
      "Digitalizar el control de inventarios mediante un sistema POS ágil en la nube.",
      "Implementar un plan de merma cero con compostaje de residuos orgánicos devuelto a la tierra.",
      "Establecer pausas activas de respiración y ergonomía para reducir la fatiga en cocina.",
      "Acreditar el modelo socioambiental bajo la figura de Sociedad BIC (Beneficio e Interés Colectivo)."
    ];
    estadoSuperior = "Convertirse en una empresa gastronómica certificada de triple impacto (Ley BIC), con merma inferior al 3% y reconocimiento como embajador de la gastronomía sostenible.";
    capacidadesADesarrollar = "Capacidad permanente de gestión circular de suministros, liderazgo consciente y resiliencia logística.";

    administrativeKpiName = "Porcentaje de merma operativa de insumos";
    adminBaseline = "18% del volumen de compra";
    adminTarget = "4% del volumen de compra";
    
    humanKpiName = "Índice de bienestar laboral y pausas activas del equipo de cocina";
    humanBaseline = "68/100 (fatiga recurrente)";
    humanTarget = "92/100 (alta vitalidad y cero rotación)";
    
    sustainableKpiName = "Porcentaje de residuos biodegradables transformados en compost";
    sustainableBaseline = "5% (desecho convencional)";
    sustainableTarget = "95% (compostaje circular)";
    
    priorities = [
      {
        id: `prio-1-${Date.now()}`,
        oportunidad: "Digitalización de Inventarios y Control de Merma",
        impactoAdministrativo: "alto",
        impactoHumano: "medio",
        impactoSostenible: "alto",
        justificacion: "Permite registrar existencias en tiempo real, agiliza compras justas y reduce en 95% el uso de papel en cocina.",
        puntuacion: 9.3,
        efectoMultiplicador: "Alivia el estrés de los cocineros, reduce costos operativos y evita el desperdicio de comida."
      },
      {
        id: `prio-2-${Date.now()}`,
        oportunidad: "Plan Gastronomía Circular & Alianzas Campesinas",
        impactoAdministrativo: "medio",
        impactoHumano: "alto",
        impactoSostenible: "alto",
        justificacion: "Devuelve los residuos orgánicos como abono de alta calidad a las familias campesinas proveedoras.",
        puntuacion: 8.8,
        efectoMultiplicador: "Fortalece la identidad cultural culinaria, fideliza a la clientela y cierra el ciclo ecológico."
      }
    ];

    etapas = [
      {
        nombre: "Etapa 1: Estabilización Operativa y Digital",
        accion: "Implementar software POS gastronómico e instaurar 10 minutos de pausas activas al inicio de cada turno.",
        responsable: "Administrador General & Jefe de Cocina",
        tiempo: "Mes 1",
        indicador: "95% de pedidos comandados digitalmente y cero accidentes",
        recursos: {
          humanos: "Equipo de salón y cocina",
          materiales: "3 tablets de cocina y dispensadores de agua",
          financieros: "$350 USD",
          tecnologicos: "Software POS en la nube"
        }
      },
      {
        nombre: "Etapa 2: Compostaje y Transición a Modelo BIC",
        accion: "Instalar composteras de decantación y redactar el pacto de gobernanza de impacto socioambiental (Ley BIC).",
        responsable: "Gerente de Sostenibilidad & Coordinador Comunitario",
        tiempo: "Mes 2-3",
        indicador: "90% de merma orgánica desviada del vertedero",
        recursos: {
          humanos: "Responsable de compostaje y asesor legal",
          materiales: "3 contenedores herméticos y bolsas biodegradables",
          financieros: "$280 USD",
          tecnologicos: "Aceleradores biológicos naturales"
        }
      }
    ];
    realidadEsperada = "Un proyecto gastronómico de vanguardia circular, con procesos transparentes, alta motivación en cocina y valor compartido con el campo.";
    radarScores = {
      administrativa: 78,
      humana: 72,
      economica: 76,
      social: 82,
      ambiental: 88,
      cultural: 75
    };
    motorMeta = {
      motor: "La convicción ética de que la alimentación debe nutrir a las personas sin agotar los suelos ni a los trabajadores.",
      meta: "Consolidar el restaurante/proyecto como modelo de referencia en soberanía alimentaria y rentabilidad sostenible.",
      precio: "Disciplina diaria en el pesaje de mermas y tiempo dedicado a la capacitación y bienestar del equipo.",
      premio: "Una cultura empresarial inquebrantable, relaciones comunitarias sólidas y márgenes financieros estables."
    };
    bicGovernance = {
      propositoSocioambiental: "Promover la alimentación saludable y la soberanía alimentaria mediante compras directas a comunidades rurales y merma cero.",
      beneficiarios: "Comensales urbanos, familias agricultoras aliadas y ecosistemas locales.",
      modeloImpacto: "Aprovechamiento integral de insumos, sustitución de plásticos por bio-empaques y remuneración justa."
    };
  }
  // 2. Comercio / Retail / Moda / E-commerce
  else if (sectorLower.includes("comercio") || sectorLower.includes("retail") || sectorLower.includes("venta") || sectorLower.includes("tienda")) {
    potencial = `${name} posee el valor latente para convertirse en una marca omnicanal de comercio consciente, líder en distribución con empaques biodegradables y una fuerza de ventas empoderada con compensación variable justa.`;
    realidad = customDesc || `Operación comercial física con reducción del 15% en ventas presenciales, acumulación de inventario de baja rotación en bodega, y gestión manual de pedidos mediante planillas sueltas.`;
    aciertos = [
      "Excelente catálogo de productos con alta durabilidad y diseño atractivo.",
      "Excelente relación de cercanía y confianza con clientes fidelizados.",
      "Honestidad en precios y puntualidad en los envíos directos."
    ];
    oportunidades_mejora = [
      "Habilitar canal digital de comercio electrónico (tienda online con pagos seguros).",
      "Sustituir cintas adhesivas y bolsas de plástico por empaques compostables de almidón.",
      "Crear esquema de comisiones y bienestar para incentivar al equipo de ventas.",
      "Documentar la gobernanza de impacto para postular a fondos de innovación sostenible."
    ];
    estadoSuperior = "Operar un e-commerce automatizado de alcance nacional con 100% envíos eco-amigables y colaboradores remunerados sobre el promedio del sector.";
    capacidadesADesarrollar = "Capacidad de analítica predictiva de stock, marketing digital ético y fidelización comunitaria.";

    administrativeKpiName = "Días promedio de rotación de inventarios";
    adminBaseline = "120 días";
    adminTarget = "55 días";
    
    humanKpiName = "Porcentaje de comisiones e incentivos cobrados por el equipo comercial";
    humanBaseline = "0% (salario fijo sin incentivo)";
    humanTarget = "18% de incremento variable sobre salario";
    
    sustainableKpiName = "Porcentaje de empaques biodegradables en envíos";
    sustainableBaseline = "10% (uso masivo de plástico)";
    sustainableTarget = "100% (cajas de cartón reciclado y bioplástico compostable)";
    
    priorities = [
      {
        id: `prio-1-${Date.now()}`,
        oportunidad: "Lanzamiento de Plataforma E-commerce y Pagos Digitales",
        impactoAdministrativo: "alto",
        impactoHumano: "medio",
        impactoSostenible: "alto",
        justificacion: "Abre canal de comercialización continuo 24/7, agiliza la rotación de stock y disminuye los traslados físicos innecesarios.",
        puntuacion: 9.4,
        efectoMultiplicador: "Multiplica las ventas, permite mayores comisiones al equipo y reduce la huella de carbono por trayecto."
      },
      {
        id: `prio-2-${Date.now()}`,
        oportunidad: "Empaques Circulares y Mensajería Verde",
        impactoAdministrativo: "bajo",
        impactoHumano: "medio",
        impactoSostenible: "alto",
        justificacion: "Convierte cada paquete entregado en un testimonio de responsabilidad ambiental que fideliza a clientes conscientes.",
        puntuacion: 8.5,
        efectoMultiplicador: "Refuerza la marca, elimina pasivos ambientales y despierta orgullo en el equipo de empaque."
      }
    ];

    etapas = [
      {
        nombre: "Etapa 1: Plataforma Web y Sincronización",
        accion: "Crear tienda online optimizada para móviles, catalogar productos y capacitar al equipo en despacho ágil.",
        responsable: "Líder Comercial & Gestor Web",
        tiempo: "Mes 1",
        indicador: "Tienda online operativa y primeros 50 pedidos virtuales",
        recursos: {
          humanos: "Desarrollador web y vendedor de tienda",
          materiales: "Fotografía de producto y packaging inicial",
          financieros: "$400 USD",
          tecnologicos: "Plataforma SaaS E-commerce"
        }
      },
      {
        nombre: "Etapa 2: Empaques Bio y Red de Entrega Eco-eficiente",
        accion: "Sustituir todo el empaque por bio-bolsas y sellar convenios con couriers eléctricos o en bicicleta.",
        responsable: "Coordinador de Logística",
        tiempo: "Mes 2",
        indicador: "100% entregas con sello carbono neutral",
        recursos: {
          humanos: "Personal de empaque",
          materiales: "Bolsas de almidón vegetal certificadas",
          financieros: "$250 USD",
          tecnologicos: "Sistema de rastreo de envíos"
        }
      }
    ];
    realidadEsperada = "Comercio omnicanal robusto, rentable y admirado por su coherencia ecológica y respeto a sus colaboradores.";
    radarScores = {
      administrativa: 82,
      humana: 74,
      economica: 84,
      social: 72,
      ambiental: 79,
      cultural: 71
    };
    motorMeta = {
      motor: "La pasión por democratizar productos éticos de diseño consciente sin dañar al planeta.",
      meta: "Liderar las ventas online del sector con una cadena de suministro 100% limpia.",
      precio: "Inversión inicial en tecnología digital y esfuerzo para adoptar nuevos hábitos de empaque sostenible.",
      premio: "Autonomía comercial, clientes leales y un equipo altamente motivado."
    };
    bicGovernance = {
      propositoSocioambiental: "Ofrecer productos éticos y duraderos mediante canales circulares que reduzcan a cero el plástico de un solo uso.",
      beneficiarios: "Consumidores conscientes, transportistas locales y medio ambiente urbano.",
      modeloImpacto: "Distribución responsable, empaque compostable e incentivos económicos compartidos."
    };
  }
  // 3. General / Proyectos de Impacto / Startups / ONGs
  else {
    potencial = `${name} cuenta con el valor latente para liderar la transformación en su ecosistema, demostrando que la eficiencia en los procesos, el bienestar humano y la sostenibilidad socioambiental no compiten, sino que se potencian.`;
    realidad = customDesc || `Operación con servicios de alta calidad pero limitada por trámites manuales en papel, sobrecarga en la toma de decisiones concentrada en una sola persona, y escasa medición de impacto ecológico.`;
    aciertos = [
      "Reputación sólida y compromiso inquebrantable de los fundadores.",
      "Conocimiento técnico especializado y vocación de servicio.",
      "Capacidad para resolver contingencias complejas con creatividad."
    ];
    oportunidades_mejora = [
      "Estructurar un protocolo P-R-O-M-P-T continuo de gobernanza administrativa.",
      "Implementar herramientas de Inteligencia Sintética (Visir Digital) para automatizar análisis repetitivos.",
      "Introducir prácticas regulares de bienestar integral para evitar el agotamiento del equipo.",
      "Medir y comunicar el impacto ambiental y social para acceder a fondos de cooperación (Ley BIC)."
    ];
    estadoSuperior = "Consolidar una organización ágil, autogestionada y alineada con los 4 pilares de sostenibilidad de la Ley BIC.";
    capacidadesADesarrollar = "Gobernanza participativa, adaptación ágil al cambio y medición científica de impacto.";

    administrativeKpiName = "Tiempo promedio de respuesta y resolución de procesos";
    adminBaseline = "72 horas";
    adminTarget = "12 horas";
    
    humanKpiName = "Índice de bienestar, clima laboral y desarrollo de competencias";
    humanBaseline = "70/100";
    humanTarget = "94/100";
    
    sustainableKpiName = "Huella de impacto ambiental y comunitario cuantificada";
    sustainableBaseline = "Sin registro formal";
    sustainableTarget = "Reporte anual auditado según estándares BIC";
    
    priorities = [
      {
        id: `prio-1-${Date.now()}`,
        oportunidad: "Gobernanza Digital y Automatización con Visir Sintético",
        impactoAdministrativo: "alto",
        impactoHumano: "alto",
        impactoSostenible: "medio",
        justificacion: "Libera al equipo de tareas operativas rutinarias para concentrar el criterio humano en la creatividad y la estrategia.",
        puntuacion: 9.2,
        efectoMultiplicador: "Reduce tiempos de entrega, disminuye el estrés del personal y ahorra suministros."
      },
      {
        id: `prio-2-${Date.now()}`,
        oportunidad: "Programa de Bienestar & Sostenibilidad BIC",
        impactoAdministrativo: "medio",
        impactoHumano: "alto",
        impactoSostenible: "alto",
        justificacion: "Formaliza la política de cuidado del equipo y el compromiso con la comunidad y el entorno.",
        puntuacion: 8.7,
        efectoMultiplicador: "Eleva la productividad del equipo y posiciona a la entidad para recibir inversión de impacto."
      }
    ];

    etapas = [
      {
        nombre: "Etapa 1: Digitalización y Protocolo RAS³",
        accion: "Implementar herramientas colaborativas en la nube, automatizar reportes y fijar reuniones con enfoque en aciertos y mejoras.",
        responsable: "Dirección General",
        tiempo: "Mes 1",
        indicador: "100% de la información centralizada en el sistema",
        recursos: {
          humanos: "Equipo directivo y facilitador",
          materiales: "Manuales digitales",
          financieros: "$300 USD",
          tecnologicos: "Software colaborativo en la nube"
        }
      },
      {
        nombre: "Etapa 2: Acreditación de Impacto y Certificación BIC",
        accion: "Adecuar estatutos para el modelo de triple impacto e implementar mediciones de huella de carbono y valor social.",
        responsable: "Comité de Gobernanza & Sostenibilidad",
        tiempo: "Mes 2-3",
        indicador: "Dossier de Inversión listo para presentación a fondos",
        recursos: {
          humanos: "Auditor y equipo operativo",
          materiales: "Documentación legal",
          financieros: "$350 USD",
          tecnologicos: "Dashboard de métricas de impacto"
        }
      }
    ];
    realidadEsperada = "Una institución sólida, referente en su rubro, gobernada con transparencia y generadora de bienestar colectivo.";
    radarScores = {
      administrativa: 80,
      humana: 75,
      economica: 78,
      social: 77,
      ambiental: 81,
      cultural: 73
    };
    motorMeta = {
      motor: "El compromiso genuino con resolver una problemática real de la sociedad y el territorio.",
      meta: "Trascender como una entidad autosustentable con reconocimiento por su impacto socioambiental.",
      precio: "Dejar atrás métodos obsoletos de supervisión y abrirse a una cultura de aprendizaje continuo.",
      premio: "Capacidades permanentes adquiridas, tranquilidad operativa e impacto medible y duradero."
    };
    bicGovernance = {
      propositoSocioambiental: "Generar soluciones innovadoras que eleven la calidad de vida comunitaria respetando los límites de los ecosistemas naturales.",
      beneficiarios: "Comunidad directa, usuarios de los servicios y entorno ecológico.",
      modeloImpacto: "Gobernanza transparente, innovación abierta y reinversión orientada al bien común."
    };
  }

  return {
    id: `iter-${Date.now()}`,
    version: 1,
    date: new Date().toISOString(),
    diagnosis: {
      potencial,
      realidad,
      aciertos,
      oportunidades_mejora,
      objetivo: {
        estadoSuperior,
        capacidadesADesarrollar
      }
    },
    kpiDimension: {
      administrativa: [
        { id: `kpi-adm-${Date.now()}`, name: administrativeKpiName, baseline: adminBaseline, target: adminTarget, status: "en_progreso", pilar: 'administrativo' }
      ],
      humana: [
        { id: `kpi-hum-${Date.now()}`, name: humanKpiName, baseline: humanBaseline, target: humanTarget, status: "en_progreso", pilar: 'humano' }
      ],
      sostenible: [
        { id: `kpi-sos-${Date.now()}`, name: sustainableKpiName, baseline: sustainableBaseline, target: sustainableTarget, status: "en_progreso", pilar: 'ambiental' }
      ]
    },
    priorities,
    route: {
      etapas,
      realidadEsperada
    },
    radarScores,
    motorMeta,
    bicGovernance
  };
}
