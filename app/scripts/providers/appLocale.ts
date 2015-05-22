module barcamp {
    export interface IAppLocaleService {
        getLocale(): string;
        changeLocale(loacle: string): void;
    }

    export interface IAppLocaleProvider extends ng.IServiceProvider {
        initTranslations(): void;
    }

    export class AppLocaleProvider implements IAppLocaleProvider {
        private $translateProvider: ng.translate.ITranslateProvider;
        private $windowProvider: ng.IServiceProvider;

        constructor($translateProvider: ng.translate.ITranslateProvider, $windowProvider: ng.IServiceProvider) {
            this.$translateProvider = $translateProvider;
            this.$windowProvider = $windowProvider;

            this.$get.$inject = ['$translate', '$timeout'];
        }

        public initTranslations() {
            var translations = this.$windowProvider.$get().translations;
            for (var lang in translations) {
                if (translations.hasOwnProperty(lang)) {
                    this.$translateProvider.translations(lang, translations[lang]);
                }
            }

            this.$translateProvider
                .registerAvailableLanguageKeys(['en', 'hy'], {
                    en_US: 'en',
                    'en-US': 'en',
                    en_UK: 'en',
                    'en-UK': 'en',
                    hy_AM: 'hy',
                    'hy-AM': 'hy'
                })
                .uniformLanguageTag('bcp47')
                .useStorage('UrlStorage')
                .fallbackLanguage('en')
                .storageKey('lang');
        }

        public $get($translate: ng.translate.ITranslateService, $timeout: ng.ITimeoutService) : IAppLocaleService {
            return {
                getLocale: () => { return $translate.use(); },
                changeLocale: (locale: string) => { 
                    $timeout(() => {
                        $translate.use(locale);

                    });
                }
            };
        }

    }
}