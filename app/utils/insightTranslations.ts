import { aiBusinessAutomationTranslations } from "./insights/consulting-ai-business-automation";
import { consultingDigitalTransformationEfficiencyTranslations } from "./insights/consulting-digital-transformation-efficiency";
import { consultingDigitalTransformationUXImprovementTranslations } from "./insights/consulting-digital-transformation-ux-improvement";
import { consultingBigDataDrivenTranslations } from "./insights/consulting-big-data-driven";
import { consultingDigitalTransformationTVPTranslations } from "./insights/consulting-digital-transformation-tvp";
import { consultingLegalConsiderationsMATranslations } from "./insights/consulting-legal-considerations-ma";
import { accountingIntroductionXeroTranslations } from "./insights/accounting-introduction-xero";
import { accountingAccountingKnowledgeTranslations } from "./insights/accounting-accounting-knowledge";
import { taxDividendLegalConsiderationsTranslations } from "./insights/tax-dividend-legal-considerations";
import { taxVatTranslations } from "./insights/tax-vat";
import { taxCorporateTaxTranslations } from "./insights/tax-corporate-tax";
import { corporateServiceAmendmentTranslations } from "./insights/corporate-service-amendment";
import { corporateServiceIncorporationTranslations } from "./insights/corporate-service-incorporation";
import { corporateServiceCorporateSecretaryTranslations } from "./insights/corporate-service-corporate-secretary";
import { hrTerminationRegulationTranslations } from "./insights/hr-termination-regulation";
import { hrHybridWorkPerformanceTranslations } from "./insights/hr-hybrid-work-performance";
import { hrLeavePolicyTranslations } from "./insights/hr-leave-policy";
import { hrMandatoryProvidentFundTranslations } from "./insights/hr-mandatory-provident-fund";
import { hrIr56Translations } from "./insights/hr-ir56";
import { hrTaxClearanceDepartingEmployeesTranslations } from "./insights/hr-tax-clearance-departing-employees";
import { hrWithholdingObligationsDepartingEmployeesTranslations } from "./insights/hr-withholding-obligations-departing-employees";
import { taxTwoTieredSalariesTaxTranslations } from "./insights/tax-two-tiered-salaries-tax";
import { hrEmployersReturnBir56aTranslations } from "./insights/hr-employers-return-bir56a";
import { corporateServiceAnnualReturnCompaniesRegistryTranslations } from "./insights/corporate-service-annual-return-companies-registry";
/**
 * Template for insight/news detail pages. Any (tag, slug) with a registered translation
 * module gets the full layout (hero, share buttons, Back to insights, content sections, FAQ, contact).
 * To add a new insight: 1) Create a translation file with heroTag, heroDate, heroTitle + content keys.
 * 2) Register the key (e.g. "corporate/some-slug") and return the module in getInsightTranslations.
 * 3) Add the page entry to dynamicPageConfig.ts for document title and breadcrumb.
 */
const INSIGHT_KEY_CONSULTING_AI_BUSINESS_AUTOMATION = "consulting/ai-business-automation";
const INSIGHT_KEY_CONSULTING_DIGITAL_TRANSFORMATION = "consulting/digital-transformation-efficiency-improvement";
const INSIGHT_KEY_CONSULTING_DIGITAL_UX = "consulting/digital-transformation-ux-improvement";
const INSIGHT_KEY_CONSULTING_BIG_DATA_DRIVEN = "consulting/big-data-driven";
const INSIGHT_KEY_CONSULTING_DIGITAL_TRANSFORMATION_TVP = "consulting/digital-transformation-tvp";
const INSIGHT_KEY_CONSULTING_LEGAL_CONSIDERATIONS_MA = "consulting/legal-considerations-ma";
const INSIGHT_KEY_ACCOUNTING_INTRODUCTION_XERO = "accounting/introduction-xero";
const INSIGHT_KEY_ACCOUNTING_ACCOUNTING_KNOWLEDGE = "accounting/accounting-knowledge";
const INSIGHT_KEY_TAX_DIVIDEND_LEGAL_CONSIDERATIONS = "tax/dividend-legal-considerations";
const INSIGHT_KEY_TAX_VAT = "tax/vat";
const INSIGHT_KEY_TAX_CORPORATE_TAX = "tax/corporate-tax";
const INSIGHT_KEY_CORPORATE_SERVICE_AMENDMENT = "corporate-service/amendment";
const INSIGHT_KEY_CORPORATE_SERVICE_INCORPORATION = "corporate-service/incorporation";
const INSIGHT_KEY_CORPORATE_SERVICE_CORPORATE_SECRETARY = "corporate-service/corporate-secretary";
const INSIGHT_KEY_HR_TERMINATION_REGULATION = "hr/termination-regulation";
const INSIGHT_KEY_HR_HYBRID_WORK_PERFORMANCE = "hr/hybrid-work-performance";
const INSIGHT_KEY_HR_LEAVE_POLICY = "hr/leave-policy-explanation";
const INSIGHT_KEY_HR_MANDATORY_PROVIDENT_FUND = "hr/mandatory-provident-fund";
const INSIGHT_KEY_HR_IR56 = "hr/ir56";
const INSIGHT_KEY_HR_TAX_CLEARANCE_DEPARTING = "hr/tax-clearance-departing-employees";
const INSIGHT_KEY_HR_WITHHOLDING_OBLIGATIONS_DEPARTING = "hr/withholding-obligations-departing-employees";
const INSIGHT_KEY_TAX_TWO_TIERED_SALARIES_TAX = "tax/two-tiered-salaries-tax";
const INSIGHT_KEY_HR_EMPLOYERS_RETURN_BIR56A = "hr/employers-return-bir56a";
const INSIGHT_KEY_CORPORATE_SERVICE_ANNUAL_RETURN = "corporate-service/annual-return-companies-registry";

export function getInsightTranslations(tag: string, slug: string) {
  const key = `${tag.toLowerCase()}/${slug}`;
  if (key === INSIGHT_KEY_CONSULTING_AI_BUSINESS_AUTOMATION) {
    return aiBusinessAutomationTranslations;
  }
  if (key === INSIGHT_KEY_CONSULTING_DIGITAL_TRANSFORMATION) {
    return consultingDigitalTransformationEfficiencyTranslations;
  }
  if (key === INSIGHT_KEY_CONSULTING_DIGITAL_UX) {
    return consultingDigitalTransformationUXImprovementTranslations;
  }
  if (key === INSIGHT_KEY_CONSULTING_BIG_DATA_DRIVEN) {
    return consultingBigDataDrivenTranslations;
  }
  if (key === INSIGHT_KEY_CONSULTING_DIGITAL_TRANSFORMATION_TVP) {
    return consultingDigitalTransformationTVPTranslations;
  }
  if (key === INSIGHT_KEY_CONSULTING_LEGAL_CONSIDERATIONS_MA) {
    return consultingLegalConsiderationsMATranslations;
  }
  if (key === INSIGHT_KEY_ACCOUNTING_INTRODUCTION_XERO) {
    return accountingIntroductionXeroTranslations;
  }
  if (key === INSIGHT_KEY_ACCOUNTING_ACCOUNTING_KNOWLEDGE) {
    return accountingAccountingKnowledgeTranslations;
  }
  if (key === INSIGHT_KEY_TAX_DIVIDEND_LEGAL_CONSIDERATIONS) {
    return taxDividendLegalConsiderationsTranslations;
  }
  if (key === INSIGHT_KEY_TAX_VAT) {
    return taxVatTranslations;
  }
  if (key === INSIGHT_KEY_TAX_CORPORATE_TAX) {
    return taxCorporateTaxTranslations;
  }
  if (key === INSIGHT_KEY_CORPORATE_SERVICE_AMENDMENT) {
    return corporateServiceAmendmentTranslations;
  }
  if (key === INSIGHT_KEY_CORPORATE_SERVICE_INCORPORATION) {
    return corporateServiceIncorporationTranslations;
  }
  if (key === INSIGHT_KEY_CORPORATE_SERVICE_CORPORATE_SECRETARY) {
    return corporateServiceCorporateSecretaryTranslations;
  }
  if (key === INSIGHT_KEY_HR_TERMINATION_REGULATION) {
    return hrTerminationRegulationTranslations;
  }
  if (key === INSIGHT_KEY_HR_HYBRID_WORK_PERFORMANCE) {
    return hrHybridWorkPerformanceTranslations;
  }
  if (key === INSIGHT_KEY_HR_LEAVE_POLICY) {
    return hrLeavePolicyTranslations;
  }
  if (key === INSIGHT_KEY_HR_MANDATORY_PROVIDENT_FUND) {
    return hrMandatoryProvidentFundTranslations;
  }
  if (key === INSIGHT_KEY_HR_IR56) {
    return hrIr56Translations;
  }
  if (key === INSIGHT_KEY_HR_TAX_CLEARANCE_DEPARTING) {
    return hrTaxClearanceDepartingEmployeesTranslations;
  }
  if (key === INSIGHT_KEY_HR_WITHHOLDING_OBLIGATIONS_DEPARTING) {
    return hrWithholdingObligationsDepartingEmployeesTranslations;
  }
  if (key === INSIGHT_KEY_TAX_TWO_TIERED_SALARIES_TAX) {
    return taxTwoTieredSalariesTaxTranslations;
  }
  if (key === INSIGHT_KEY_HR_EMPLOYERS_RETURN_BIR56A) {
    return hrEmployersReturnBir56aTranslations;
  }
  if (key === INSIGHT_KEY_CORPORATE_SERVICE_ANNUAL_RETURN) {
    return corporateServiceAnnualReturnCompaniesRegistryTranslations;
  }
  return null;
}

export { aiBusinessAutomationTranslations } from "./insights/consulting-ai-business-automation";
export { consultingDigitalTransformationEfficiencyTranslations } from "./insights/consulting-digital-transformation-efficiency";
export { consultingDigitalTransformationUXImprovementTranslations } from "./insights/consulting-digital-transformation-ux-improvement";
export { consultingBigDataDrivenTranslations } from "./insights/consulting-big-data-driven";
export { consultingDigitalTransformationTVPTranslations } from "./insights/consulting-digital-transformation-tvp";
export { consultingLegalConsiderationsMATranslations } from "./insights/consulting-legal-considerations-ma";
export { accountingIntroductionXeroTranslations } from "./insights/accounting-introduction-xero";
export { accountingAccountingKnowledgeTranslations } from "./insights/accounting-accounting-knowledge";
export { taxDividendLegalConsiderationsTranslations } from "./insights/tax-dividend-legal-considerations";
export { taxVatTranslations } from "./insights/tax-vat";
export { taxCorporateTaxTranslations } from "./insights/tax-corporate-tax";
export { corporateServiceAmendmentTranslations } from "./insights/corporate-service-amendment";
export { corporateServiceIncorporationTranslations } from "./insights/corporate-service-incorporation";
export { corporateServiceCorporateSecretaryTranslations } from "./insights/corporate-service-corporate-secretary";
export { hrTerminationRegulationTranslations } from "./insights/hr-termination-regulation";
export { hrHybridWorkPerformanceTranslations } from "./insights/hr-hybrid-work-performance";
export { hrLeavePolicyTranslations } from "./insights/hr-leave-policy";
export { hrMandatoryProvidentFundTranslations } from "./insights/hr-mandatory-provident-fund";
export { hrIr56Translations } from "./insights/hr-ir56";
export { hrTaxClearanceDepartingEmployeesTranslations } from "./insights/hr-tax-clearance-departing-employees";
export { hrWithholdingObligationsDepartingEmployeesTranslations } from "./insights/hr-withholding-obligations-departing-employees";
export { taxTwoTieredSalariesTaxTranslations } from "./insights/tax-two-tiered-salaries-tax";
export { hrEmployersReturnBir56aTranslations } from "./insights/hr-employers-return-bir56a";
export { corporateServiceAnnualReturnCompaniesRegistryTranslations } from "./insights/corporate-service-annual-return-companies-registry";
