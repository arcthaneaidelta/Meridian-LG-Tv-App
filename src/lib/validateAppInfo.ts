export interface ValidationRule {
  id: string;
  name: string;
  description: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
}

export function validateAppInfo(jsonString: string): { isValidJson: boolean; rules: ValidationRule[] } {
  let parsed: any = null;
  let isValidJson = true;

  try {
    parsed = JSON.parse(jsonString);
  } catch (err: any) {
    isValidJson = false;
    return {
      isValidJson: false,
      rules: [
        {
          id: 'valid-json',
          name: 'Valid JSON syntax',
          description: 'appinfo.json must be strictly parseable JSON without trailing commas',
          status: 'fail',
          message: `Syntax error: ${err.message}`,
        },
      ],
    };
  }

  const rules: ValidationRule[] = [
    {
      id: 'valid-json',
      name: 'Valid JSON syntax',
      description: 'appinfo.json must be strictly parseable JSON',
      status: 'pass',
      message: 'JSON structure parsed successfully.',
    },
    {
      id: 'app-id',
      name: 'Application ID format',
      description: 'Must use reverse-domain format, lowercase, alphanumeric, no spaces',
      status:
        typeof parsed.id === 'string' &&
        /^[a-z0-9]+(\.[a-z0-9]+)+$/.test(parsed.id)
          ? 'pass'
          : 'fail',
      message:
        typeof parsed.id === 'string' && /^[a-z0-9]+(\.[a-z0-9]+)+$/.test(parsed.id)
          ? `ID "${parsed.id}" follows reverse-domain specification.`
          : `ID "${parsed.id || ''}" contains spaces or non-lowercase characters. Expected reverse-domain (e.g. com.harbormedia.harbortv).`,
    },
    {
      id: 'semver-version',
      name: 'Version format (SemVer)',
      description: 'Version string must be in x.y.z numeric format',
      status:
        typeof parsed.version === 'string' && /^\d+\.\d+\.\d+$/.test(parsed.version)
          ? 'pass'
          : 'fail',
      message:
        typeof parsed.version === 'string' && /^\d+\.\d+\.\d+$/.test(parsed.version)
          ? `Version "${parsed.version}" is valid SemVer.`
          : `Version "${parsed.version || ''}" must have three segments (e.g. 1.0.3).`,
    },
    {
      id: 'app-type',
      name: 'App Type is "web"',
      description: 'Must be explicitly set to "web" for HTML5 TV applications',
      status: parsed.type === 'web' ? 'pass' : 'fail',
      message: parsed.type === 'web' ? 'type is "web".' : 'type must equal "web".',
    },
    {
      id: 'main-entry',
      name: 'Main HTML entry file',
      description: 'Must specify initial launch file (usually index.html)',
      status: typeof parsed.main === 'string' && parsed.main.endsWith('.html') ? 'pass' : 'fail',
      message: typeof parsed.main === 'string' ? `Entry "${parsed.main}" defined.` : 'Missing main file parameter.',
    },
    {
      id: 'title-length',
      name: 'Title length limit',
      description: 'Title string should be concise (≤ 40 characters)',
      status: typeof parsed.title === 'string' && parsed.title.length <= 40 ? 'pass' : 'warn',
      message: typeof parsed.title === 'string' ? `Title length: ${parsed.title.length}/40 characters.` : 'Missing title string.',
    },
    {
      id: 'vendor-name',
      name: 'Vendor declaration',
      description: 'Publisher or studio organization name for store attribution',
      status: Boolean(parsed.vendor) ? 'pass' : 'warn',
      message: parsed.vendor ? `Vendor: "${parsed.vendor}".` : 'Vendor property missing.',
    },
    {
      id: 'resolution-spec',
      name: 'Resolution declaration',
      description: 'Target raster canvas (1920x1080 recommended for webOS)',
      status: parsed.resolution === '1920x1080' ? 'pass' : 'warn',
      message: parsed.resolution === '1920x1080' ? 'Resolution declared 1920x1080.' : 'Missing resolution field. Recommended "1920x1080" for crisp scaling.',
    },
    {
      id: 'icon-asset',
      name: 'Icon asset pointer',
      description: 'Reference to 130×130 launcher icon (icon.png)',
      status: Boolean(parsed.icon) ? 'pass' : 'fail',
      message: parsed.icon ? `Icon points to "${parsed.icon}".` : 'icon.png declaration is mandatory.',
    },
    {
      id: 'large-icon-asset',
      name: 'Large icon pointer',
      description: 'Reference to 160×160 store icon (largeIcon.png)',
      status: Boolean(parsed.largeIcon) ? 'pass' : 'fail',
      message: parsed.largeIcon ? `Large icon points to "${parsed.largeIcon}".` : 'largeIcon.png is required for Seller Lounge.',
    },
    {
      id: 'splash-background',
      name: 'Splash background image',
      description: 'Provides instant branding before JavaScript executes',
      status: Boolean(parsed.splashBackground) ? 'pass' : 'warn',
      message: parsed.splashBackground ? `Splash background declared: "${parsed.splashBackground}".` : 'Missing splashBackground entry. Cold boots will show black screen.',
    },
    {
      id: 'bg-image',
      name: 'Launcher background card',
      description: 'Recent-bar background thumbnail in webOS launcher',
      status: Boolean(parsed.bgImage) ? 'pass' : 'warn',
      message: parsed.bgImage ? `bgImage declared: "${parsed.bgImage}".` : 'bgImage is optional but recommended by LG design guidelines.',
    },
  ];

  return { isValidJson: true, rules };
}
