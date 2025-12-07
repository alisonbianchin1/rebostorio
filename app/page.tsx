"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Menu,
  X,
  Search,
  Shield,
  Award,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Background3D from "./components/Background3D";
import Caradev from "./components/Caradev.png";
import Escritorio from "./components/escritorioad.jpg";
import Franquia from "./components/franquiadepizza.jpg";
import Mentoria from "./components/mentoriar6.jpg";
import Nutricionista from "./components/nutricionista.jpg";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Loja Virtual Premium",
    description: "E-commerce com integração de pagamento e gestão de estoque",
    image: Caradev,
  },
  {
    id: 2,
    title: "App Mobile de Logística",
    description:
      "Aplicativo para rastreamento e gestão de entregas em tempo real",
    image: Escritorio,
  },
  {
    id: 3,
    title: "Dashboard Analítico",
    description: "Plataforma de análise de dados e relatórios personalizados",
    image: Franquia,
  },
  {
    id: 4,
    title: "Identidade Visual Completa",
    description:
      "Branding, design gráfico e materialidades para empresa de tech",
    image: Mentoria,
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"geral" | "configuracao">("geral");
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [portfolioIndex, setPortfolioIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateItems = () => {
      const w = window.innerWidth;
      if (w >= 1024) setItemsToShow(3);
      else if (w >= 768) setItemsToShow(2);
      else setItemsToShow(1);
    };
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(0, PORTFOLIO_ITEMS.length - itemsToShow);
    setPortfolioIndex((prev) => Math.min(prev, maxIndex));
  }, [itemsToShow]);

  const trackRef = useRef<HTMLDivElement | null>(null);

  const goToIndex = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    if (child) {
      el.scrollTo({ left: child.offsetLeft - 8, behavior: "smooth" });
    }
  };

  const prevSlide = () => {
    const newIndex = Math.max(0, portfolioIndex - 1);
    setPortfolioIndex(newIndex);
    goToIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = Math.min(PORTFOLIO_ITEMS.length - 1, portfolioIndex + 1);
    setPortfolioIndex(newIndex);
    goToIndex(newIndex);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const header = document.querySelector("header");
      const headerHeight = header ? (header as HTMLElement).offsetHeight : 80;
      const offsetTop = element.offsetTop - headerHeight - 8; // account for fixed header dynamically
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = "5515997851886";
    const message = `Olá! Meu nome é ${formData.name}%0A%0AEmpresa: ${formData.company}%0AEmail: ${formData.email}%0A%0AMensagem: ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <Background3D />

      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-orange-500/30"
            : "bg-black/95 border-orange-500/20"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
          <Link
            href="/"
            aria-label="Voltar para a home"
            className="no-underline"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm sm:text-base font-bold tracking-[0.3em] uppercase cursor-pointer"
            >
              Axy.on
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 lg:gap-12 items-center text-sm uppercase tracking-widest">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-orange-500 transition-colors"
            >
              INÍCIO
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="hover:text-orange-500 transition-colors"
            >
              SERVIÇOS
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-orange-500 transition-colors"
            >
              SOBRE
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="hover:text-orange-500 transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-orange-500 transition-colors"
            >
              CONTATO
            </button>
          </div>

          {/* Buy Ticket Button */}
          <div className="hidden md:flex">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 transition-all font-bold text-sm uppercase tracking-wider"
            >
              CONTRATAR
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black border-t border-orange-500/20"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("home")}
                className="py-3 hover:text-orange-500 transition-colors text-sm uppercase tracking-wider text-left"
              >
                INÍCIO
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="py-3 hover:text-orange-500 transition-colors text-sm uppercase tracking-wider text-left"
              >
                SERVIÇOS
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="py-3 hover:text-orange-500 transition-colors text-sm uppercase tracking-wider text-left"
              >
                SOBRE
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="py-3 hover:text-orange-500 transition-colors text-sm uppercase tracking-wider text-left"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="py-3 hover:text-orange-500 transition-colors text-sm uppercase tracking-wider text-left"
              >
                CONTATO
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="py-3 px-5 bg-orange-500 text-center font-bold text-sm uppercase tracking-wider"
              >
                CONTRATAR
              </button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-20 relative bg-black"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10" />

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <h1 className="text-6xl sm:text-7xl md:text-[180px] font-black leading-[0.85] mb-8 sm:mb-12 tracking-tighter">
              Axy.on
            </h1>

            <div className="flex items-center justify-between max-w-4xl mx-auto mb-12 text-xs sm:text-sm uppercase tracking-[0.3em] font-mono">
              <div className="text-left">
                <p className="mb-1">LIBERE SUA CRIATIVIDADE NA ERA</p>
                <p>DA HIPER-EFICIÊNCIA.</p>
              </div>
              <div className="text-right">
                <p className="mb-1">2035</p>
                <p>Sorocaba, SP</p>
              </div>
            </div>

            {/* Gradient Bar */}
          </motion.div>
        </div>
      </section>

      {/* Prepare To Section */}
      <section className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative bg-black">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-16 sm:mb-20 md:mb-24 tracking-tight uppercase"
          >
            PREPARE-SE PARA
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-l border-t border-white/20">
            {[
              {
                title: "EXPLORAR NOVAS\nOPORTUNIDADES",
                desc: "Descubra soluções inovadoras para transformar seu negócio. Desenvolvemos websites customizados que elevam sua presença digital a outro nível.",
                pattern: "checkered",
              },
              {
                title: "REVOLUCIONAR\nSEU PENSAMENTO",
                desc: "Adote tecnologias de ponta e metodologias ágeis que vão transformar a forma como você vê e executa seus projetos digitais.",
                pattern: "checkered",
              },
              {
                title: "APRIMORAR\nSUAS HABILIDADES",
                desc: "Trabalhe com as tecnologias mais modernas do mercado: React, Next.js, TypeScript e soluções cloud de última geração.",
                pattern: "checkered",
              },
              {
                title: "CONECTAR COM\nINOVADORES",
                desc: "Junte-se a empresas que já transformaram seus negócios com nossas soluções. Seja parte da revolução digital.",
                pattern: "checkered",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 sm:p-12 md:p-16 border-r border-b border-white/20 group hover:bg-white/5 transition-all cursor-pointer min-h-[350px] sm:min-h-[400px]"
                style={{
                  backgroundImage:
                    item.pattern === "checkered"
                      ? "repeating-conic-gradient(rgba(255,255,255,0.03) 0% 25%, transparent 0% 50%) 50% / 20px 20px"
                      : "none",
                }}
              >
                <div className="absolute top-8 right-8 w-8 h-8 bg-purple-500/50"></div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 group-hover:text-orange-400 transition-colors uppercase whitespace-pre-line leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / Tracks Section */}
      <section
        id="services"
        className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 relative bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 p-12 sm:p-16 md:p-24 flex items-center"
            >
              <div>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight uppercase mb-4">
                  NOSSOS
                  <br />
                  SERVIÇOS
                  <br />
                  DIGITAIS
                </h2>
              </div>
            </motion.div>

            {/* Right Side - Color Blocks */}
            <div className="grid grid-cols-1 gap-0">
              {[
                {
                  name: "01_\nDesenvolver sites\npersonalizados",
                  color: "bg-orange-500",
                },
                {
                  name: "02_\nCriar aplicativos\ninovadores",
                  color: "bg-purple-900",
                },
                {
                  name: "03_\nGerenciar sua\npresença digital",
                  color: "bg-gray-400 text-black",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`${service.color} p-12 sm:p-16 flex items-center justify-start cursor-pointer transition-all hover:brightness-110 min-h-[200px]`}
                >
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold whitespace-pre-line leading-tight uppercase">
                    {service.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 bg-white text-black relative"
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8 mb-12 sm:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
            >
              PERGUNTAS
              <span className="block mt-2">FREQUENTES</span>
            </motion.h2>

            <div className="hidden md:flex items-center gap-3 relative">
              <input
                type="text"
                placeholder="Procurando algo?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 pr-10 bg-white/60 border border-black/20 rounded-lg focus:border-orange-500 focus:bg-white outline-none transition-all text-sm w-64"
              />
              <Search
                size={18}
                className="text-black/40 absolute right-3 pointer-events-none"
              />
            </div>
          </div>

          <div className="flex gap-8 mb-12 border-b border-black/20">
            <button
              onClick={() => setActiveTab("geral")}
              className={`pb-4 ${
                activeTab === "geral"
                  ? "border-b-2 border-black font-semibold"
                  : "text-black/40 hover:text-black"
              } transition-colors tracking-wide`}
            >
              Geral
            </button>
            <button
              onClick={() => setActiveTab("configuracao")}
              className={`pb-4 ${
                activeTab === "configuracao"
                  ? "border-b-2 border-black font-semibold"
                  : "text-black/40 hover:text-black"
              } transition-colors tracking-wide`}
            >
              Configuração
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === "geral" &&
              (() => {
                const faqs = [
                  {
                    question: "Como funciona o processo de desenvolvimento?",
                    answer:
                      "Trabalhamos em sprints ágeis, mantendo você informado em cada etapa. Desde o planejamento até a entrega, garantimos transparência total e qualidade excepcional.",
                  },
                  {
                    question: "Qual é o prazo médio de entrega?",
                    answer:
                      "Depende da complexidade do projeto. Projetos simples podem levar até 24h, enquanto aplicações mais robustas podem levar 3-7 dias. Sempre entregamos no prazo acordado ou antes.",
                  },
                  {
                    question: "Oferecem suporte pós-lançamento?",
                    answer:
                      "Sim! Oferecemos suporte completo e manutenção contínua para garantir que sua solução continue performando perfeitamente após o lançamento.",
                  },
                  {
                    question: "Qual é a política de garantia?",
                    answer:
                      "Oferecemos garantia de 7 dias para reembolso total caso não fique satisfeito. Além disso, todos os projetos têm 90 dias de garantia para correção de bugs sem custo adicional.",
                  },
                ];

                const filteredFaqs = searchTerm
                  ? faqs.filter(
                      (faq) =>
                        faq.question
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        faq.answer
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
                  : faqs;

                return filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-black/20 p-4 sm:p-6 hover:border-black/40 transition-all group cursor-pointer bg-white/60 backdrop-blur-sm hover:bg-white/80 shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-orange-500 transition-colors">
                          {faq.question}
                        </h3>
                        <ArrowRight
                          className="rotate-90 group-hover:translate-y-1 transition-transform flex-shrink-0"
                          size={20}
                        />
                      </div>
                      <p className="text-black/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12 text-black/40">
                    <p>
                      Nenhum resultado encontrado para &quot;{searchTerm}&quot;
                    </p>
                  </div>
                );
              })()}

            {activeTab === "configuracao" &&
              (() => {
                const faqs = [
                  {
                    question: "Quais tecnologias vocês utilizam?",
                    answer:
                      "Utilizamos as tecnologias mais modernas do mercado: React, Next.js, TypeScript, Node.js, Python, e soluções cloud como AWS, Google Cloud e Azure. Escolhemos a stack ideal para cada projeto.",
                  },
                  {
                    question: "Como funciona a comunicação durante o projeto?",
                    answer:
                      "Mantemos comunicação constante via WhatsApp, e-mail e reuniões semanais. Você terá acesso a um dashboard de acompanhamento onde pode ver o progresso em tempo real.",
                  },
                  {
                    question: "Vocês trabalham com metodologias ágeis?",
                    answer:
                      "Sim! Utilizamos as linguagens e tecnologias mais atualizadas do momento. Você participa ativamente do processo por meio de reviews e feedbacks constantes.",
                  },
                  {
                    question: "Como funciona o pagamento?",
                    answer:
                      "Trabalhamos com diferentes modelos: projeto fechado, hora técnica ou mensalidade. Geralmente dividimos em parcelas: entrada, desenvolvimento e entrega final. Tudo é ajustável às suas necessidades.",
                  },
                ];

                const filteredFaqs = searchTerm
                  ? faqs.filter(
                      (faq) =>
                        faq.question
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        faq.answer
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
                  : faqs;

                return filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-black/20 p-4 sm:p-6 hover:border-black/40 transition-all group cursor-pointer bg-white/60 backdrop-blur-sm hover:bg-white/80 shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-orange-500 transition-colors">
                          {faq.question}
                        </h3>
                        <ArrowRight
                          className="rotate-90 group-hover:translate-y-1 transition-transform flex-shrink-0"
                          size={20}
                        />
                      </div>
                      <p className="text-black/60 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12 text-black/40">
                    <p>
                      Nenhum resultado encontrado para &quot;{searchTerm}&quot;
                    </p>
                  </div>
                );
              })()}
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-slate-100 relative">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {/* Microsoft Partner */}
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 border border-black/10 hover:border-black/20 transition-all shadow-lg hover:shadow-xl group">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Shield size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                    AC SAFEWEB RFB v5
                  </h3>
                  <p className="text-sm text-black/60">
                    Certificados e reconhecidos pela Microsoft
                  </p>
                </div>
              </div>
            </div>

            {/* 90 Days Guarantee */}
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 border border-black/10 hover:border-black/20 transition-all shadow-lg hover:shadow-xl group">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                  <Award size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-purple-500 transition-colors">
                    90 Dias de Garantia
                  </h3>
                  <p className="text-sm text-black/60">
                    Correção de bugs sem custo adicional
                  </p>
                </div>
              </div>
            </div>

            {/* 7 Days Refund */}
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 border border-black/10 hover:border-black/20 transition-all shadow-lg hover:shadow-xl group">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-pink-600 rounded-full flex items-center justify-center">
                  <CheckCircle size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-violet-500 transition-colors">
                    7 Dias de Reembolso
                  </h3>
                  <p className="text-sm text-black/60">
                    Satisfação garantida ou seu dinheiro de volta
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Refund Policy Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 sm:mt-12 bg-gradient-to-r from-orange-50 to-purple-50 p-6 sm:p-8 border border-orange-200 rounded-lg"
          >
            <h4 className="text-xl sm:text-2xl font-bold mb-4 text-black">
              Política de Reembolso
            </h4>
            <p className="text-black/70 leading-relaxed mb-4">
              Estamos tão confiantes na qualidade do nosso trabalho que
              oferecemos uma garantia de reembolso total dentro de 7 dias após o
              início do projeto.
            </p>
            <ul className="space-y-2 text-black/60">
              <li className="flex items-start gap-2">
                <CheckCircle
                  size={20}
                  className="text-orange-500 flex-shrink-0 mt-0.5"
                />
                <span>Sem perguntas, sem complicações</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle
                  size={20}
                  className="text-orange-500 flex-shrink-0 mt-0.5"
                />
                <span>Reembolso processado em até 5 dias úteis</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle
                  size={20}
                  className="text-orange-500 flex-shrink-0 mt-0.5"
                />
                <span>Válido para todos os tipos de projeto</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 bg-gray-100 text-black relative scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Left Column - About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 uppercase tracking-tight">
                QUEM SOMOS
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-black/70">
                Somos especialistas em transformação digital, desenvolvendo
                soluções tecnológicas sob medida para empresas que querem se
                destacar no mercado. Nossa equipe combina criatividade,
                expertise técnica e metodologias ágeis para entregar resultados
                excepcionais.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                <div className="bg-white p-6 sm:p-8 border border-black/10 flex items-center justify-center min-h-24 sm:min-h-40">
                  <p className="text-sm uppercase tracking-wider text-center">
                    VIRTUAL E PRESENCIAL
                  </p>
                </div>
                <div
                  className="bg-orange-400 p-6 sm:p-8 flex items-center justify-center min-h-24 sm:min-h-40 cursor-pointer hover:bg-orange-500 transition-colors"
                  onClick={() => scrollToSection("contact")}
                >
                  <p className="text-sm uppercase tracking-wider font-bold text-center">
                    CONTRATAR
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Portfolio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 uppercase tracking-tight">
                NOSSOS TRABALHOS
              </h3>

              {/* Portfolio Carousel */}
              <div className="relative w-full">
                <div className="overflow-hidden rounded-lg">
                  <div
                    ref={trackRef}
                    className="flex gap-6 overflow-x-auto snap-x snap-mandatory py-2 px-1 w-full"
                  >
                    {PORTFOLIO_ITEMS.map((item) => (
                      <div
                        key={item.id}
                        className="snap-start flex-shrink-0 w-[80%] sm:w-[300px] lg:w-[360px] max-w-[360px] mx-auto sm:mx-0"
                      >
                        <div className="rounded-xl overflow-hidden shadow-2xl border border-black/5">
                          <div className="relative overflow-hidden h-56 sm:h-72 lg:h-80 bg-gradient-to-br from-gray-200 to-gray-300">
                            <img
                              src={
                                typeof item.image === "string"
                                  ? item.image
                                  : item.image.src
                              }
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-orange-500 hover:bg-orange-600 text-white w-10 h-10 rounded-full transition-all hover:scale-105 shadow-lg items-center justify-center"
                  aria-label="Previous portfolio item"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={nextSlide}
                  className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-orange-500 hover:bg-orange-600 text-white w-10 h-10 rounded-full transition-all hover:scale-105 shadow-lg items-center justify-center"
                  aria-label="Next portfolio item"
                >
                  <ChevronRight size={18} />
                </button>

                {/* Dots Indicator */}
              </div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid md:grid-cols-2 gap-0 border border-black/10"
          ></motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 bg-white text-black relative"
      >
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-12 sm:mb-16 tracking-tight"
          >
            VAMOS
            <span className="block text-transparent bg-linear-to-r from-orange-400 to-purple-400 bg-clip-text mt-2">
              TRANSFORMAR
            </span>
          </motion.h2>

          <motion.form
            onSubmit={handleWhatsAppSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 bg-white/60 backdrop-blur-sm p-6 sm:p-8 md:p-10 border border-black/10 shadow-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Seu Nome"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="px-4 sm:px-5 py-3 sm:py-4 bg-white/80 border border-black/20 focus:border-orange-500 outline-none transition-all tracking-wide text-base"
              />
              <input
                type="email"
                placeholder="Seu Melhor Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="px-4 sm:px-5 py-3 sm:py-4 bg-white/80 border border-black/20 focus:border-orange-500 outline-none transition-all tracking-wide text-base"
              />
            </div>
            <input
              type="text"
              placeholder="Sua Empresa"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/80 border border-black/20 focus:border-orange-500 outline-none transition-all tracking-wide text-base"
            />
            <textarea
              placeholder="Conte-nos sobre seu projeto"
              rows={6}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/80 border border-black/20 focus:border-orange-500 outline-none transition-all tracking-wide text-base resize-none"
            ></textarea>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 sm:py-5 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-bold text-base sm:text-lg tracking-wide shadow-xl hover:shadow-orange-500/50 transition-all flex items-center justify-center gap-2"
            >
              <FaWhatsapp size={24} />
              Enviar via WhatsApp
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-black border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
              <span className="text-white">AXY.ON</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12">
            <div>
              <h4 className="font-semibold mb-4 sm:mb-6 tracking-wide text-sm uppercase">
                Links
              </h4>
              <div className="space-y-2 sm:space-y-3 text-white/60 text-sm">
                <button
                  onClick={() => scrollToSection("home")}
                  className="block hover:text-orange-400 transition-colors"
                >
                  Início
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="block hover:text-orange-400 transition-colors"
                >
                  Serviços
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="block hover:text-orange-400 transition-colors"
                >
                  Sobre
                </button>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="block hover:text-orange-400 transition-colors"
                >
                  FAQ
                </button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 sm:mb-6 tracking-wide text-sm uppercase">
                Contato
              </h4>
              <div className="space-y-2 sm:space-y-3 text-white/60 text-sm">
                <p>axyon.contato@gmail.com</p>
                <p>+55 15 99785-1886</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 sm:mb-6 tracking-wide text-sm uppercase">
                Localização
              </h4>
              <div className="space-y-2 sm:space-y-3 text-white/60 text-sm">
                <p>Sorocaba, SP</p>
                <p>Votorantim, SP</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 sm:mb-6 tracking-wide text-sm uppercase">
                Redes Sociais
              </h4>
              <div className="flex gap-4">
                <a
                  href="https://wa.me/5515997851886"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-orange-500 transition-all flex items-center justify-center"
                >
                  <FaWhatsapp size={20} />
                </a>
                <a
                  href="https://www.instagram.com/axy.on"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-purple-500 transition-all flex items-center justify-center"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-white/40 text-xs sm:text-sm">
            © 2025 AXY.ON - Todos os direitos reservados
          </div>
        </div>
      </footer>
    </main>
  );
}
