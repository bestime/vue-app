import { getLanguage } from "@/utils";
import {createI18n} from "vue-i18n";

export type TLocals = 'zh' | 'en'

const defaultLang: TLocals = getLanguage()

const i18n = createI18n({
    locale: defaultLang,
    fallbackLocale: defaultLang,
    legacy: false,
    globalInjection:true,
    messages: {
      zh: {
        global: {
          systemName: '管理后台模板'
        }
      },
      en: {
        global: {
          systemName: 'Manage Template'
        }
      }
    }
});

export default i18n