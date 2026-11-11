import Link from 'next/link';
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_PERSONAL_DATA_CONSENT_PATH,
  LEGAL_PRIVACY_PATH,
  LEGAL_TERMS_PATH,
} from '@/shared/constants/legal';
import { BrandLogo } from '@/shared/components/layout/brand-logo';
import { CookieSettingsButton } from '@/shared/components/layout/cookie-settings-button';

export function Footer() {
  return (
    <footer className="border-border bg-background mt-auto border-t pb-[calc(2.5rem+var(--safe-area-bottom))] pt-16">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-80">
            <BrandLogo />
            <p className="text-muted-foreground mt-4 text-sm leading-[1.55]">
              Контроль сделок, фиксация договорённостей и документы для фрилансеров.
            </p>
          </div>

          <nav aria-label="Документы и контакты">
            <div>
              <p className="text-muted-foreground font-mono text-[11px] uppercase tracking-[0.18em]">
                Документы
              </p>
              <ul className="text-muted-foreground mt-4 space-y-2.5 text-sm">
                <li>
                  <Link
                    href={LEGAL_PRIVACY_PATH}
                    className="hover:text-foreground transition-colors"
                  >
                    Политика конфиденциальности
                  </Link>
                </li>
                <li>
                  <Link href={LEGAL_TERMS_PATH} className="hover:text-foreground transition-colors">
                    Условия использования
                  </Link>
                </li>
                <li>
                  <Link
                    href={LEGAL_PERSONAL_DATA_CONSENT_PATH}
                    className="hover:text-foreground transition-colors"
                  >
                    Согласие на обработку данных
                  </Link>
                </li>
                <li>
                  <CookieSettingsButton />
                </li>
              </ul>
              <a
                href={`mailto:${LEGAL_CONTACT_EMAIL}`}
                className="text-muted-foreground hover:text-foreground mt-5 block text-sm transition-colors"
              >
                {LEGAL_CONTACT_EMAIL}
              </a>
            </div>
          </nav>
        </div>

        <div className="border-border text-muted-foreground mt-14 flex flex-col justify-between gap-3 border-t pt-6 text-[13px] sm:flex-row">
          <span>© {new Date().getFullYear()} Delo. Все права защищены.</span>
          <span>Сделано для фрилансеров с любовью 💜</span>
        </div>
      </div>
    </footer>
  );
}
