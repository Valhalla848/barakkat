import React, { CSSProperties, useState } from "react";
import { ChevronLeft, ChevronRight, X, Menu } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

export const MacbookPro = (): JSX.Element => {
  interface CaseStudy {
    title: string;
    description: string;
    link: string;
    image: string;
    titleColor: string;
    descColor: string;
    overlayClass: string;
  }

  const serviceCategories = [
    {
      title: "Генеральная уборка",
      description: "Тщательная очистка всех поверхностей, включая труднодоступные места",
      link: "Заказать услугу",
    },
    {
      title: "Ежедневная поддержка чистоты",
      description: "Поддержание порядка на регулярной основе",
      link: "Заказать услугу",
    },
    {
      title: "Подготовка к праздникам",
      description: "Декорирование и создание праздничной атмосферы",
      link: "Заказать услугу",
    },
    {
      title: "Химчистка мебели и ковров",
      description: "Удаление загрязнений и освежение интерьера",
      link: "Заказать услугу",
    },
    {
      title: "Подбор персонала",
      description: "Подбор персонала любой сложности",
      link: "Заказать услугу",
    },
    {
      title: "Другие услуги",
      description: "Подберём решение\nдля любых задач по уборке",
      link: "Заказать услугу",
    },
  ];

  const selectionSteps = [
    "(1) Профессионализм и опыт — каждый сотрудник прошел специальное обучение",
    "(2) Индивидуальный подход — учитываем особенности каждого помещения",
    "(3) Доступные цены — гибкие тарифы, адаптированные под потребности",
    "(4) Надежность и ответственность — дорожим репутацией и ценим доверие клиентов",
  ];

  const caseStudies: CaseStudy[] = [
    {
      title: "Профессионализм и опыт",
      description: "Каждый сотрудник нашей команды прошел специальное обучение и имеет богатый опыт работы в сфере клининга",
      link: "Читать подробнее",
      image:
        "/pic1.jpg",
      titleColor: "text-white",
      descColor: "text-white",
      overlayClass: "bg-gradient-to-br from-black/70 via-black/40 to-transparent",
    },
    {
      title: "Индивидуальный подход",
      description: "Мы учитываем особенности каждого помещения и пожелания клиентов, предлагая персонализированные решения",
      link: "Читать подробнее",
      image:
        "/pic2.jpg",
      titleColor: "text-white",
      descColor: "text-white",
      overlayClass: "bg-gradient-to-br from-black/70 via-black/40 to-transparent",
    },
    {
      title: "Доступные цены",
      description:
        "Наши тарифы гибкие и адаптированы под потребности каждого заказчика. Вы можете выбрать оптимальный пакет услуг",
      link: "Читать подробнее",
      image:
        "/pic3.jpg",
      titleColor: "text-white",
      descColor: "text-white",
      overlayClass: "bg-gradient-to-br from-black/70 via-black/40 to-transparent",
    },
    {
      title: "Надежность и ответственность",
      description:
        "Мы дорожим своей репутацией и ценим доверие наших клиентов. Каждый заказ выполняется своевременно и качественно",
      link: "Читать подробнее",
      image:
        "/pic4.jpg",
      titleColor: "text-white",
      descColor: "text-white",
      overlayClass: "bg-gradient-to-br from-black/70 via-black/40 to-transparent",
    },
  ];


  const formQuestions = [
    {
      id: "service",
      title: "Какая услуга вам нужна?",
      options: [
        { value: "general", label: "Генеральная уборка" },
        { value: "daily", label: "Ежедневная поддержка чистоты" },
        { value: "holiday", label: "Подготовка к праздникам" },
        { value: "dryclean", label: "Химчистка мебели и ковров" },
        { value: "postbuild", label: "Постройочная уборка" },
        { value: "other", label: "Другая услуга" },
      ],
    },
    {
      id: "area",
      title: "Какова площадь помещения?",
      options: [
        { value: "small", label: "До 50 м²" },
        { value: "medium", label: "50-100 м²" },
        { value: "large", label: "100-200 м²" },
        { value: "xlarge", label: "Более 200 м²" },
      ],
    },
    {
      id: "frequency",
      title: "Как часто нужна уборка?",
      options: [
        { value: "once", label: "Один раз" },
        { value: "weekly", label: "Еженедельно" },
        { value: "daily", label: "Ежедневно" },
        { value: "custom", label: "По индивидуальному графику" },
      ],
    },
    {
      id: "urgency",
      title: "Когда нужна уборка?",
      options: [
        { value: "urgent", label: "Срочно (сегодня-завтра)" },
        { value: "week", label: "В течение недели" },
        { value: "month", label: "В течение месяца" },
        { value: "planning", label: "Пока только планирую" },
      ],
    },
    {
      id: "budget",
      title: "Какой у вас бюджет?",
      options: [
        { value: "economy", label: "Эконом вариант" },
        { value: "standard", label: "Стандартный вариант" },
        { value: "premium", label: "Премиум вариант" },
        { value: "consult", label: "Нужна консультация" },
      ],
    },
  ];

  const features = [
    "Опыт и профессионализм — высокое качество обслуживания",
    "Использование современных технологий и материалов для эффективной уборки",
    "Индивидуальный подход к каждому клиенту и доступные цены",
  ];

  const navItems = [
    { label: "Сферы работы", href: "#" },
    { label: "Кейсы", href: "#" },
    { label: "О компании", href: "#" },
    { label: "Отзывы", href: "#" },
    { label: "Контакты", href: "#" },
  ];

  const formSectionId = "quote-form";

  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [modalCase, setModalCase] = useState<CaseStudy | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formAnswers, setFormAnswers] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      formQuestions.map((question) => [
        question.id,
        question.options[0].value,
      ]),
    ),
  );
  const totalFormSteps = formQuestions.length;
  const currentFormStep = currentQuestionIndex + 1;
  const formProgress = (currentFormStep / totalFormSteps) * 100;
  const isModalOpen = modalCase !== null;

  const handleScrollToForm = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    const target = document.getElementById(formSectionId);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePrevCase = (): void => {
    setActiveCaseIndex(
      (prevIndex) => (prevIndex - 1 + caseStudies.length) % caseStudies.length,
    );
  };

  const handleNextCase = (): void => {
    setActiveCaseIndex((prevIndex) => (prevIndex + 1) % caseStudies.length);
  };

  const handleOpenCaseModal = (caseStudy: CaseStudy): void => {
    setModalCase(caseStudy);
  };

  const handleCloseCaseModal = (): void => {
    setModalCase(null);
  };

  const handleAnswerChange = (questionId: string, value: string): void => {
    setFormAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNextQuestion = (): void => {
    setCurrentQuestionIndex((prev) =>
      prev < totalFormSteps - 1 ? prev + 1 : prev,
    );
  };

  const handlePrevQuestion = (): void => {
    setCurrentQuestionIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const currentQuestion = formQuestions[currentQuestionIndex];
  const handleSubmit = (): void => {
    console.log("Submitted answers", formAnswers);
  };
  const withDelay = (seconds: number): CSSProperties =>
    ({
      "--animation-delay": `${seconds}s`,
    }) as CSSProperties;

  return (
    <>
      <div className="bg-white w-full min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen bg-[linear-gradient(141deg,rgba(110,203,255,1)_0%,rgba(57,169,231,1)_100%)] overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            alt="Mask group"
            src="/mask-group-1.png"
          />

          {/* Navbar */}
          <nav className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-[110px]">
            <div className="max-w-7xl mx-auto bg-white rounded-[50px] h-[50px] sm:h-[60px] lg:h-[70px] flex items-center justify-between px-4 sm:px-6 lg:px-8 animate-fade-in" style={withDelay(0.1)}>
              <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                <img
                  src="/cvt.svg"
                  alt="Logo"
                  className="h-[30px] sm:h-[35px] lg:h-[40px] w-auto object-contain"
                />
                <div className="hidden lg:flex items-center gap-6 lg:gap-8">
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="[font-family:'Inter',Helvetica] font-normal text-text text-base lg:text-xl text-center hover:opacity-70 transition-opacity"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <div className="hidden sm:flex items-center gap-2 sm:gap-3 lg:gap-4">
                  {/* <img
                    className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] lg:w-[33px] lg:h-[33px] object-cover"
                    alt="Free icon social"
                    src="/free-icon-social-15707820-2.png"
                  />
                  <img
                    className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] lg:w-[33px] lg:h-[33px] object-cover"
                    alt="Free icon telegram"
                    src="/free-icon-telegram-5968804-2.png"
                  /> */}
                  <div className="[font-family:'Inter',Helvetica] font-medium text-[#313642] text-sm sm:text-base lg:text-xl">
                  +8 (926)144-14-11
                  </div>
                </div>
                <Button
                  className="lg:hidden p-2"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  variant="ghost"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden mt-4 bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col gap-4">
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="[font-family:'Inter',Helvetica] font-normal text-text text-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <img
                      className="w-8 h-8 object-cover"
                      alt="Free icon social"
                      src="/free-icon-social-15707820-2.png"
                    />
                    <img
                      className="w-8 h-8 object-cover"
                      alt="Free icon telegram"
                      src="/free-icon-telegram-5968804-2.png"
                    />
                    <div className="[font-family:'Inter',Helvetica] font-medium text-[#313642] text-base">
                    +8 (926)144-14-11
                    </div>
                  </div>
                </div>
              </div>
            )}
          </nav>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
              <div className="flex-1">
                <div className="mb-4 sm:mb-6">
                  <div className="[font-family:'Inter',Helvetica] font-medium text-white text-lg sm:text-xl lg:text-2xl tracking-[-0.25px] leading-normal">
                    Москва и МО
                  </div>
                </div>

                <h1
                  className="[font-family:'Inter',Helvetica] font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-[70.4px] tracking-[0] leading-tight sm:leading-[1.1] lg:leading-[77.4px] mb-6 sm:mb-8 animate-fade-up"
                  style={withDelay(0.2)}
                >
                  Барракат: мир вашему дому
                  <br />чистота начинается с вас!
                </h1>

                <p
                  className="[font-family:'Comfortaa',Helvetica] font-medium text-white text-lg sm:text-xl lg:text-2xl tracking-[-0.25px] leading-relaxed mb-6 sm:mb-8 animate-fade-up"
                  style={withDelay(0.3)}
                >
                  Компания Барракат — это команда профессионалов, готовых обеспечить безупречную чистоту вашего дома, офиса или любого другого помещения
                </p>

                <div className="relative mb-6 sm:mb-8 animate-fade-up" style={withDelay(0.4)}>
                  <Button
                    className="w-full sm:w-auto min-w-[280px] sm:min-w-[446px] h-[70px] sm:h-[85px] lg:h-[95px] rounded-[7px] shadow-[5px_4px_14px_#00000014,21px_14px_26px_#00000012,48px_32px_35px_#0000000a,86px_56px_41px_#00000003,134px_88px_45px_transparent,inset_5px_6px_5.5px_#ffffff4a] bg-[linear-gradient(137deg,rgba(224,255,102,1)_0%,rgba(205,255,7,1)_100%)] h-auto"
                    onClick={handleScrollToForm}
                  >
                    <span className="[font-family:'Inter',Helvetica] font-bold text-[#343645] text-xl sm:text-2xl lg:text-[31.5px] text-center tracking-[-0.33px] leading-tight sm:leading-[34.6px]">
                      Рассчитать стоимость
                    </span>
                  </Button>
                  <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 w-[240px] sm:w-[280px] lg:w-[307px] h-8 sm:h-9 lg:h-10 bg-[#343645] rounded-[19.87px] border border-solid border-[#7171711a] rotate-[4.28deg] shadow-[inset_0px_0px_0px_#ffffff40,inset_2px_2px_4px_#ffffff6e]" />
                  <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 w-[220px] sm:w-[260px] lg:w-[291px] h-7 sm:h-8 lg:h-[29px] rotate-[4.43deg] [font-family:'Comfortaa',Helvetica] font-normal text-white text-sm sm:text-base lg:text-[22.1px] text-center tracking-[-0.23px] leading-tight sm:leading-[29.2px] flex items-center justify-center">
                    возможна постоплата
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12">
                  <div className="bg-[#ffffff08] rounded-[15px] shadow-[inset_0px_0px_52.9px_#ffffff40,inset_4px_4px_9.4px_#ffffff4a] backdrop-blur-[25.65px] p-4 sm:p-6">
                    <div className="[font-family:'Comfortaa',Helvetica] font-light text-white text-base sm:text-lg lg:text-[23.9px] tracking-[-0.25px] leading-relaxed">
                      Профессионализм и опыт — каждый сотрудник прошел специальное обучение
                    </div>
                  </div>
                  <div className="bg-[#ffffff08] rounded-[15px] shadow-[inset_0px_0px_52.9px_#ffffff40,inset_4px_4px_9.4px_#ffffff4a] backdrop-blur-[25.65px] p-4 sm:p-6">
                    <div className="[font-family:'Comfortaa',Helvetica] font-light text-white text-base sm:text-lg lg:text-[23.9px] tracking-[-0.25px] leading-relaxed">
                      Индивидуальный подход к каждому клиенту и помещению
                    </div>
                  </div>
                  <div className="bg-[#ffffff08] rounded-[15px] shadow-[inset_0px_0px_52.9px_#ffffff40,inset_4px_4px_9.4px_#ffffff4a] backdrop-blur-[25.65px] p-4 sm:p-6">
                    <div className="[font-family:'Comfortaa',Helvetica] font-light text-white text-base sm:text-lg lg:text-[23.9px] tracking-[-0.25px] leading-relaxed">
                      Доступные цены и прозрачное ценообразование
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-auto lg:flex-shrink-0">
                <Card className="w-full lg:w-[587px] h-[300px] sm:h-[400px] lg:h-[496px] bg-white rounded-[15px] border-[1.5px] border-solid border-[#747474] shadow-[7px_5px_19px_#0000001a,27px_21px_34px_#00000017,60px_47px_46px_#0000000d,107px_83px_54px_#00000003,167px_130px_59px_transparent] overflow-hidden">
                  <CardContent className="p-0 h-full">
                    <a
                      href="https://i.pinimg.com/originals/24/15/21/24152197af38deb718eb730992d441d0.webp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full w-full"
                    >
                      <img
                        src="/home2.jpg"
                        alt="Рабочая команда"
                        className="h-full w-full object-cover"
                      />
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <img
            className="absolute left-1/2 -translate-x-1/2 top-[860px] w-[7px] h-36 object-cover hidden lg:block"
            alt="Line"
            src="/line-1.svg"
          />
          <img
            className="absolute left-[1104px] top-[860px] w-[7px] h-36 object-cover hidden lg:block"
            alt="Line"
            src="/line-2.svg"
          />
        </section>

        {/* Services Section */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="[font-family:'Inter',Helvetica] font-bold text-[#343645] text-3xl sm:text-4xl lg:text-[56.5px] text-center tracking-[0] leading-tight sm:leading-[51.3px] mb-6 sm:mb-8">
              Мы предлагаем широкий спектр услуг по уборке помещений
            </h2>

            <p className="[font-family:'Comfortaa',Helvetica] font-light text-[#343645] text-lg sm:text-xl lg:text-[26px] text-center tracking-[0] leading-relaxed mb-8 sm:mb-12">
              Наши специалисты используют современное оборудование и качественные средства, обеспечивающие эффективность уборки и безопасность для здоровья ваших близких
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {serviceCategories.map((category, index) => (
                <Card
                  key={index}
                  className="w-full h-auto min-h-[180px] sm:min-h-[205px] rounded-[7px] shadow-[5px_4px_14px_#00000014,21px_14px_26px_#00000012,48px_32px_35px_#0000000a,86px_56px_41px_#00000003,134px_88px_45px_transparent] bg-[linear-gradient(137deg,rgba(224,255,102,1)_0%,rgba(205,255,7,1)_100%)] border-0 transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03]"
                >
                  <CardContent className="p-6 sm:p-8 lg:p-[53px] h-full flex flex-col justify-between">
                    <div>
                      <h3 className="w-full h-auto [font-family:'Comfortaa',Helvetica] font-normal text-[#343645] text-2xl sm:text-2xl lg:text-[28.1px] tracking-[0] leading-tight sm:leading-[24.4px] flex items-center justify-center mb-4 sm:mb-5">
                        {category.title}
                      </h3>
                      <p className="w-full h-auto [font-family:'Comfortaa',Helvetica] font-light text-[#343645] text-lg sm:text-xl lg:text-[23.7px] tracking-[0] leading-relaxed sm:leading-[25.4px] flex items-center justify-center whitespace-pre-line">
                        {category.description}
                      </p>
                    </div>
                    <div className="mt-6 sm:mt-8">
                      <a
                        href={`#${formSectionId}`}
                        onClick={handleScrollToForm}
                        className="w-full h-auto [font-family:'Comfortaa',Helvetica] font-medium text-[#343645] text-lg sm:text-xl lg:text-[23.8px] tracking-[-0.52px] leading-tight sm:leading-[25.5px] underline flex items-center justify-center transition-colors duration-200 hover:text-[#1f2029]"
                      >
                        {category.link}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="rounded-lg border-[none] shadow-[28px_24px_81px_#00000005,113px_95px_147px_#00000005,254px_213px_199px_#00000003,452px_378px_236px_transparent,707px_591px_250px_transparent] relative p-[3px] [background:linear-gradient(133deg,rgba(144,216,255,0.81)_0%,rgba(85,188,244,1)_100%)]">
                <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-12">
                  <div className="flex flex-col gap-4 sm:gap-5 lg:gap-[22px]">
                    {selectionSteps.map((step, index) => (
                      <p
                        key={index}
                        className="w-full h-auto [font-family:'Comfortaa',Helvetica] font-light text-[#343645] text-base sm:text-lg lg:text-[22.8px] text-center tracking-[0] leading-relaxed sm:leading-[24.4px] flex items-center justify-center"
                      >
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cases Section */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 bg-[linear-gradient(141deg,rgba(110,203,255,1)_0%,rgba(57,169,231,1)_100%)] overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            alt="Mask group"
            src="/mask-group-2.png"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="[font-family:'Inter',Helvetica] font-bold text-white text-3xl sm:text-4xl lg:text-[56.1px] tracking-[-0.59px] leading-tight sm:leading-[63.7px] mb-4 sm:mb-6">
              Почему выбирают нас?
            </h2>

            <p className="[font-family:'Comfortaa',Helvetica] font-light text-[#313642] text-lg sm:text-xl lg:text-[23.5px] tracking-[0] leading-relaxed sm:leading-[26.7px] mb-8 sm:mb-12">
              Мы понимаем важность комфорта и гигиены в повседневной жизни каждого клиента, именно поэтому наша работа строится на принципах надежности, качества и внимания к деталям
            </p>

            <div className="flex items-center justify-end gap-4 mb-6 sm:mb-8">
              <Button
                className="w-[50px] h-[50px] sm:w-[63px] sm:h-[63px] rounded-[12px] bg-[#ffffff21] shadow-[inset_0px_0px_15.8px_#ffffff40,inset_0px_1px_4px_#ffffff40] backdrop-blur-[21.2px] hover:bg-[#ffffff40] transition-colors duration-200 text-[#313642] h-auto p-0 flex items-center justify-center"
                onClick={handlePrevCase}
                aria-label="Предыдущий кейс"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
              <Button
                className="w-[50px] h-[50px] sm:w-[63px] sm:h-[63px] rounded-[12px] bg-[linear-gradient(137deg,rgba(224,255,102,1)_0%,rgba(205,255,7,1)_100%)] shadow-[5px_4px_14px_#00000014,21px_14px_26px_#00000012,48px_32px_35px_#0000000a,86px_56px_41px_#00000003,134px_88px_45px_transparent] hover:opacity-90 transition-opacity duration-200 text-[#313642] h-auto p-0 flex items-center justify-center"
                onClick={handleNextCase}
                aria-label="Следующий кейс"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </div>

            <div className="w-full overflow-hidden rounded-[12px] animate-fade-up" style={withDelay(0.3)}>
              <div
                className="flex h-auto transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${activeCaseIndex * 100}%)`,
                }}
              >
                {caseStudies.map((caseStudy, index) => (
                  <div
                    key={caseStudy.title}
                    className="relative w-full flex-shrink-0 rounded-[12px] overflow-hidden bg-white shadow-[5px_4px_14px_#00000014,21px_14px_26px_#00000012,48px_32px_35px_#0000000a,86px_56px_41px_#00000003,134px_88px_45px_transparent] animate-fade-up"
                    style={withDelay(0.2 + index * 0.1)}
                  >
                    <div className="relative h-[200px] sm:h-[240px] lg:h-[40%] w-full overflow-hidden">
                      <img
                        src={caseStudy.image}
                        alt={caseStudy.title}
                        className="h-full w-full object-cover"
                      />
                      <div className={`absolute inset-0 ${caseStudy.overlayClass}`} />
                    </div>
                    <div className="flex h-auto min-h-[240px] sm:min-h-[280px] lg:min-h-[360px] flex-col justify-between p-6 sm:p-8">
                      <h3
                        className={`[font-family:'Comfortaa',Helvetica] font-bold text-[#2f3143] text-xl sm:text-2xl lg:text-[24.5px] tracking-[-0.22px] leading-tight sm:leading-[28px] text-center mb-4`}
                      >
                        {caseStudy.title}
                      </h3>
                      <p
                        className="[font-family:'Comfortaa',Helvetica] font-light text-[#2f3143] text-lg sm:text-xl lg:text-[23.7px] tracking-[0] leading-relaxed sm:leading-[25.4px] text-center mb-4"
                      >
                        {caseStudy.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleOpenCaseModal(caseStudy)}
                        className="[font-family:'Comfortaa',Helvetica] font-medium text-[#2f3143] text-lg sm:text-xl lg:text-[23.8px] tracking-[-0.52px] leading-tight sm:leading-[25.5px] underline self-center transition-opacity duration-200 hover:opacity-70"
                      >
                        {caseStudy.link}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveCaseIndex(index)}
                  aria-label={`Показать кейс ${index + 1}`}
                  className={`h-2 w-6 rounded-full transition-all duration-300 ${
                    activeCaseIndex === index
                      ? "bg-[linear-gradient(137deg,rgba(224,255,102,1)_0%,rgba(205,255,7,1)_100%)] w-10"
                      : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="[font-family:'Inter',Helvetica] font-bold text-[#343645] text-3xl sm:text-4xl lg:text-[56.1px] tracking-[0] leading-tight sm:leading-[63.7px] text-center mb-8 sm:mb-12">
              Персональный менеджер 24/7. Бригадир всегда на месте, отчёты ежедневные
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {features.map((feature, index) => (
                <p
                  key={index}
                  className="w-full h-auto [font-family:'Comfortaa',Helvetica] font-normal text-[#343645] text-lg sm:text-xl lg:text-[23.4px] tracking-[0] leading-relaxed sm:leading-[25.6px] flex items-center justify-center whitespace-pre-line text-center"
                >
                  {feature}
                </p>
              ))}
            </div>

            <p className="[font-family:'Comfortaa',Helvetica] font-normal text-[#343645] text-2xl sm:text-3xl lg:text-[37px] tracking-[-0.39px] leading-tight sm:leading-[39.4px] text-center mb-8 sm:mb-12">
              Есть лицензия Минтруда. Несем материальную ответственность за ваше
              имущество
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <Card className="w-full h-[400px] sm:h-[500px] lg:h-[681px] bg-neutral-50 rounded-[9px] border border-solid border-[#8e8e8e] shadow-[4px_0px_9px_#0000000f,16px_0px_16px_#0000000d,36px_0px_21px_#00000008,63px_0px_25px_#00000003,99px_0px_28px_transparent]">
                <CardContent className="p-0 h-full" />
              </Card>
              <Card className="w-full h-[400px] sm:h-[500px] lg:h-[681px] bg-neutral-50 rounded-[9px] border border-solid border-[#8e8e8e] shadow-[4px_0px_9px_#0000000f,16px_0px_16px_#0000000d,36px_0px_21px_#00000008,63px_0px_25px_#00000003,99px_0px_28px_transparent]">
                <CardContent className="p-0 h-full" />
              </Card>
              <Card className="w-full h-[400px] sm:h-[500px] lg:h-[681px] bg-neutral-50 rounded-[9px] border border-solid border-[#8e8e8e] shadow-[4px_0px_9px_#0000000f,16px_0px_16px_#0000000d,36px_0px_21px_#00000008,63px_0px_25px_#00000003,99px_0px_28px_transparent]">
                <CardContent className="p-0 h-full" />
              </Card>
            </div>

            <div className="text-center mt-6 sm:mt-8">
              <div className="[font-family:'Inter',Helvetica] font-light text-[#5f5f5f] text-lg sm:text-xl lg:text-[23.4px] text-center tracking-[0] leading-relaxed sm:leading-[25.6px]">
                Лицензии
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section
          id={formSectionId}
          className="relative w-full py-12 sm:py-16 lg:py-24 bg-[linear-gradient(141deg,rgba(110,203,255,1)_0%,rgba(57,169,231,1)_100%)]"
        >
          <img
            className="absolute inset-0 w-full h-full object-cover"
            alt="Mask group"
            src="/mask-group-4.png"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="relative w-full max-w-5xl mx-auto rounded-[32px] bg-white px-6 sm:px-8 md:px-12 lg:px-[86px] py-8 sm:py-12 lg:py-[88px] text-[#343643] shadow-[28px_24px_81px_#00000014,113px_95px_147px_#00000010,254px_213px_199px_#00000008] animate-fade-up"
              style={withDelay(0.2)}
            >
              <div className="mb-8 sm:mb-12">
                <div className="h-[12px] w-full rounded-full bg-[#ecf5ff]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(137deg,rgba(224,255,102,1)_0%,rgba(205,255,7,1)_100%)]"
                    style={{ width: `${formProgress}%` }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between [font-family:'Comfortaa',Helvetica] text-sm sm:text-base lg:text-[18px] text-[#6b6d7a]">
                  <span>Шаг {currentFormStep}/{totalFormSteps}</span>
                  <span>Прогресс {Math.round(formProgress)}%</span>
                </div>
              </div>

              <div className="mb-8 sm:mb-10 flex flex-col gap-4">
                <h2 className="[font-family:'Inter',Helvetica] text-3xl sm:text-4xl lg:text-[56.5px] font-bold leading-tight sm:leading-[64.2px] text-[#343645]">
                  Свяжитесь с нами прямо сейчас!
                  <br />
                  Мы готовы сделать вашу жизнь комфортнее и уютнее
                </h2>
                <div className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(137deg,rgba(224,255,102,1)_0%,rgba(205,255,7,1)_100%)] px-4 sm:px-5 py-1.5 sm:py-2 text-[#313642] shadow-[5px_4px_14px_#00000024,21px_14px_26px_#0000001a,48px_32px_35px_#00000014] [font-family:'Comfortaa',Helvetica] text-base sm:text-lg lg:text-[18px] font-medium w-fit">
                  За расчёт скидка 10%
                </div>
              </div>

              <div className="mb-8 sm:mb-12 space-y-6">
                <h3 className="[font-family:'Comfortaa',Helvetica] text-xl sm:text-2xl lg:text-[28px] font-medium leading-tight sm:leading-[32px]">
                  {currentQuestion.title}
                </h3>
                <RadioGroup
                  value={formAnswers[currentQuestion.id]}
                  onValueChange={(value) =>
                    handleAnswerChange(currentQuestion.id, value)
                  }
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
                >
                  {currentQuestion.options.map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={`${currentQuestion.id}-${option.value}`}
                      className="w-full h-[60px] sm:h-[70px] lg:h-[75px] rounded-[7px] border border-solid border-[#5f5f5f] flex items-center px-4 sm:px-5 lg:px-6 cursor-pointer transition-colors hover:border-[#8c8c8c]"
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={`${currentQuestion.id}-${option.value}`}
                        className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] lg:w-[25px] lg:h-[25px] rounded-[12.5px] border border-solid border-[#5b5b5b]"
                      />
                      <span className="ml-3 sm:ml-[14px] [font-family:'Comfortaa',Helvetica] font-normal text-[#343643] text-base sm:text-lg lg:text-[23.2px] tracking-[0] leading-relaxed sm:leading-[25.4px]">
                        {option.label}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6">
                <Button
                  className="flex items-center justify-center gap-3 h-[60px] sm:h-[72px] rounded-[7px] border border-solid border-[#7d7d7d] bg-transparent px-6 sm:px-8 text-[#343643] transition hover:bg-[#f1f1f1] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="[font-family:'Comfortaa',Helvetica] text-base sm:text-lg lg:text-[20px] leading-tight sm:leading-[24px]">
                    Назад
                  </span>
                </Button>
                <Button
                  className="h-[60px] sm:h-[72px] rounded-[7px] bg-[linear-gradient(137deg,rgba(224,255,102,1)_0%,rgba(205,255,7,1)_100%)] px-8 sm:px-10 lg:px-12 text-[#2f3143] shadow-[5px_4px_14px_#00000024,21px_14px_26px_#0000001a,48px_32px_35px_#00000014] transition hover:brightness-105 flex-1 sm:flex-initial"
                  onClick={
                    currentQuestionIndex === totalFormSteps - 1
                      ? handleSubmit
                      : handleNextQuestion
                  }
                >
                  <span className="[font-family:'Comfortaa',Helvetica] text-base sm:text-lg lg:text-[23px] font-medium leading-tight sm:leading-[26px]">
                    {currentQuestionIndex === totalFormSteps - 1 ? "Отправить" : "Далее"}
                  </span>
                </Button>
              </div>
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <div className="[font-family:'Inter',Helvetica] text-2xl sm:text-3xl lg:text-[36px] font-semibold leading-tight sm:leading-[42px] text-[#1f2331]">
                +8 (926)144-14-11
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="relative w-full py-12 sm:py-16 lg:py-24 bg-[linear-gradient(141deg,rgba(110,203,255,1)_0%,rgba(57,169,231,1)_100%)] overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            alt="Mask group"
            src="/mask-group-5.png"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="[font-family:'Inter',Helvetica] font-bold text-white text-3xl sm:text-4xl lg:text-[56.1px] tracking-[0] leading-tight sm:leading-[56.8px] text-center mb-4 sm:mb-6">
              Выбирайте компанию BARACAT, доверяйте профессионалам заботу о чистоте своего пространства
            </h2>

            <h3 className="[font-family:'Comfortaa',Helvetica] font-normal text-white text-2xl sm:text-3xl lg:text-[35px] tracking-[0] leading-tight sm:leading-[38.2px] text-center mb-8 sm:mb-12">
              Позвоните нам или оставьте заявку на сайте — мы оперативно свяжемся с вами
            </h3>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <Card className="w-full h-[400px] sm:h-[500px] lg:h-[683px] bg-neutral-50 rounded-2xl border border-solid border-[#8e8e8e] shadow-[4px_0px_9px_#0000000f,16px_0px_16px_#0000000d,36px_0px_21px_#00000008,63px_0px_25px_#00000003,99px_0px_28px_transparent]">
                <CardContent className="p-0 h-full" />
              </Card>
              <Card className="w-full h-[400px] sm:h-[500px] lg:h-[683px] bg-neutral-50 rounded-2xl border border-solid border-[#8e8e8e] shadow-[4px_0px_9px_#0000000f,16px_0px_16px_#0000000d,36px_0px_21px_#00000008,63px_0px_25px_#00000003,99px_0px_28px_transparent]">
                <CardContent className="p-0 h-full" />
              </Card>
              <Card className="w-full h-[400px] sm:h-[500px] lg:h-[683px] bg-neutral-50 rounded-2xl border border-solid border-[#8e8e8e] shadow-[4px_0px_9px_#0000000f,16px_0px_16px_#0000000d,36px_0px_21px_#00000008,63px_0px_25px_#00000003,99px_0px_28px_transparent]">
                <CardContent className="p-0 h-full" />
              </Card>
            </div> */}

            <div className="text-center mt-6 sm:mt-8">
              <div className="[font-family:'Inter',Helvetica] font-light text-[#5f5f5f] text-lg sm:text-xl lg:text-[23.4px] text-center tracking-[0] leading-relaxed sm:leading-[25.6px]">
                Письма благодарностей
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative w-full bg-[#343643] py-12 sm:py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-8 sm:mb-12">
              <div>
                <h2 className="[font-family:'Inter',Helvetica] font-bold text-white text-2xl sm:text-3xl lg:text-[61.2px] tracking-[0] leading-tight sm:leading-[62.0px] mb-6 sm:mb-8">
                  Получите бесплатную консультацию и расчёт стоимости со скидкой 10%
                </h2>
                <div className="relative mb-4 sm:mb-6">
                  <div className="top-[7316px] left-[1023px] w-full max-w-[306px] h-8 sm:h-9 lg:h-10 rounded-[96px] rotate-[3.75deg] shadow-[2px_2px_6px_#0000005e,8px_7px_10px_#00000052,47px_45px_18px_#00000003] bg-[linear-gradient(137deg,rgba(224,255,102,1)_0%,rgba(205,255,7,1)_100%)]" />
                  <div className="absolute top-0 left-0 w-full max-w-[271px] h-6 sm:h-7 lg:h-[21px] rotate-[3.89deg] [font-family:'Comfortaa',Helvetica] font-medium text-[#313642] text-base sm:text-lg lg:text-[20.9px] text-center tracking-[-0.22px] leading-tight sm:leading-[19.0px] flex items-center justify-center">
                    Возможна постоплата
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <img
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-[74px] lg:h-[74px] object-cover"
                    alt="Free icon social"
                    src="/free-icon-social-15707820-2.png"
                  />
                  <img
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-[74px] lg:h-[74px] object-cover"
                    alt="Free icon telegram"
                    src="/free-icon-telegram-5968804-2.png"
                  />
                </div>
                <div className="[font-family:'Inter',Helvetica] font-light text-white text-xl sm:text-2xl lg:text-[33px] leading-tight sm:leading-[36.1px] mb-4 sm:mb-6">
                +8 (926)144-14-11
                </div>
                <div className="[font-family:'Comfortaa',Helvetica] font-normal text-white text-lg sm:text-xl lg:text-[33px] tracking-[0] leading-tight sm:leading-[36.1px] mb-4 sm:mb-6">
                barakat_ooo2024@mail.ru
                </div>
                <address className="[font-family:'Comfortaa',Helvetica] font-normal text-white text-lg sm:text-xl lg:text-[33px] tracking-[0] leading-tight sm:leading-[36.1px] mb-4 sm:mb-6 not-italic">
                  Москва, адрес
                </address>
                <p className="[font-family:'Comfortaa',Helvetica] font-normal text-white text-lg sm:text-xl lg:text-[33px] tracking-[0] leading-tight sm:leading-[36.1px]">
                  Работаем без перерывов, праздников и выходных
                </p>
              </div>

              <div>
                <p className="[font-family:'Comfortaa',Helvetica] font-normal text-white text-xl sm:text-2xl lg:text-[31.2px] tracking-[0] leading-tight sm:leading-[34.1px] mb-6 sm:mb-8">
                  Запишитесь на консультацию,&nbsp;&nbsp; мы перезвоним за 10 минут
                </p>
                <Input className="w-full h-[60px] sm:h-[70px] lg:h-[84px] rounded-[7px] border border-solid border-[#cfcfcf] bg-transparent text-white mb-4 sm:mb-6" placeholder="Ваш телефон" />
                <Button className="w-full h-[60px] sm:h-[70px] lg:h-[84px] rounded-[7px] shadow-[5px_4px_14px_#00000014,21px_14px_26px_#00000012,48px_32px_35px_#0000000a,86px_56px_41px_#00000003,134px_88px_45px_transparent,inset_5px_6px_5.5px_#ffffff4a] bg-[linear-gradient(137deg,rgba(224,255,102,1)_0%,rgba(205,255,7,1)_100%)] h-auto mb-4 sm:mb-6">
                  <span className="[font-family:'Comfortaa',Helvetica] font-bold text-[#393939] text-xl sm:text-2xl lg:text-[31.1px] text-center tracking-[-0.33px] leading-tight sm:leading-[28.3px]">
                    Получить консультацию
                  </span>
                </Button>
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Checkbox className="w-6 h-6 sm:w-7 sm:h-7 lg:w-[31px] lg:h-[33px] border border-solid border-[#9d9d9d]" />
                  <p className="[font-family:'Comfortaa',Helvetica] font-light text-[#bfbfbf] text-xs sm:text-sm lg:text-[13.6px] tracking-[0] leading-tight sm:leading-[14.9px]">
                    Ознакомлен( на) с Политикой конфиденциальности и даю Согласие на
                    обработку персональных данных
                  </p>
                </div>
                <div className="[font-family:'Inter',Helvetica] font-light text-white text-xl sm:text-2xl lg:text-[33px] text-center leading-tight sm:leading-[36.1px]">
                +8 (926)144-14-11
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/20">
              <div className="[font-family:'Inter',Helvetica] font-light text-[#bfbfbf] text-sm sm:text-base lg:text-[18.7px] tracking-[0] leading-tight sm:leading-[20.4px] text-center sm:text-left">
                Политика конфиденциальности
              </div>
              <div className="[font-family:'Inter',Helvetica] font-light text-[#bfbfbf] text-sm sm:text-base lg:text-[18.7px] tracking-[0] leading-tight sm:leading-[20.4px] text-center sm:text-right">
                Сайт разработан alishkagang
              </div>
            </div>
          </div>
        </footer>
      </div>

      {isModalOpen && modalCase && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0f1a]/60 px-4 sm:px-6 py-6 sm:py-8"
          onClick={handleCloseCaseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-modal-title"
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[24px] bg-white shadow-[0px_24px_60px_rgba(16,22,36,0.25)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCloseCaseModal}
              aria-label="Закрыть модальное окно"
              className="absolute right-4 sm:right-6 top-4 sm:top-6 z-10 inline-flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full bg-black/60 text-white transition-opacity duration-200 hover:opacity-80"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <img
              src={modalCase.image}
              alt={modalCase.title}
              className="h-[200px] sm:h-[240px] lg:h-[260px] w-full object-cover"
            />
            <div className="space-y-4 sm:space-y-6 px-6 sm:px-8 lg:px-10 pb-8 sm:pb-10 lg:pb-12 pt-6 sm:pt-8 lg:pt-10">
              <h3
                id="case-modal-title"
                className="[font-family:'Inter',Helvetica] text-2xl sm:text-3xl lg:text-[34px] font-semibold leading-tight sm:leading-[38px] text-[#1c1e2a]"
              >
                {modalCase.title}
              </h3>
              <p className="[font-family:'Comfortaa',Helvetica] text-lg sm:text-xl lg:text-[22px] leading-relaxed sm:leading-[30px] text-[#3a3c4a]">
                {modalCase.description}
              </p>
              <p className="[font-family:'Comfortaa',Helvetica] text-base sm:text-lg lg:text-[20px] leading-relaxed sm:leading-[28px] text-[#3a3c4a]">
                Мы готовы обеспечить безупречную чистоту вашего помещения. Уточните детали запроса, и менеджер
                свяжется с вами в течение 10 минут для подбора оптимального решения.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  className="rounded-[9px] bg-[linear-gradient(137deg,rgba(224,255,102,1)_0%,rgba(205,255,7,1)_100%)] px-6 sm:px-8 py-3 sm:py-4 text-[#2f3143] shadow-[5px_4px_14px_#00000014,21px_14px_26px_#00000012,48px_32px_35px_#0000000a]"
                  onClick={(event) => {
                    handleScrollToForm(event);
                    handleCloseCaseModal();
                  }}
                >
                  <span className="[font-family:'Inter',Helvetica] text-lg sm:text-xl lg:text-[22px] font-semibold leading-tight sm:leading-[26px]">
                    Оставить заявку
                  </span>
                </Button>
                <button
                  type="button"
                  onClick={handleCloseCaseModal}
                  className="[font-family:'Comfortaa',Helvetica] text-base sm:text-lg lg:text-[20px] font-medium leading-tight sm:leading-[26px] text-[#3a3c4a] underline transition-opacity duration-200 hover:opacity-70"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
