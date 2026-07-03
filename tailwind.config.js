/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-public-sans)', '-apple-system', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        md: '8px',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      typography: ({ theme }) => {
        const shared = {
          '--tw-prose-body': 'var(--color-ink)',
          '--tw-prose-headings': 'var(--color-ink)',
          '--tw-prose-links': 'var(--color-primary)',
          '--tw-prose-bold': 'var(--color-ink)',
          '--tw-prose-quotes': 'var(--color-ink)',
          '--tw-prose-quote-borders': 'transparent',
          '--tw-prose-captions': 'var(--color-muted)',
          '--tw-prose-code': 'var(--color-ink)',
          '--tw-prose-hr': 'var(--color-surface)',
          '--tw-prose-th-borders': 'var(--color-surface)',
          '--tw-prose-td-borders': 'var(--color-surface)',
          '--tw-prose-invert-body': 'var(--color-ink)',
          '--tw-prose-invert-headings': 'var(--color-ink)',
          '--tw-prose-invert-links': 'var(--color-primary)',
          '--tw-prose-invert-bold': 'var(--color-ink)',
          '--tw-prose-invert-quotes': 'var(--color-ink)',
          '--tw-prose-invert-quote-borders': 'transparent',
          '--tw-prose-invert-captions': 'var(--color-muted)',
          '--tw-prose-invert-code': 'var(--color-ink)',
          '--tw-prose-invert-hr': 'var(--color-surface)',
          '--tw-prose-invert-th-borders': 'var(--color-surface)',
          '--tw-prose-invert-td-borders': 'var(--color-surface)',
          maxWidth: '68ch',
          fontSize: '1.125rem',
          lineHeight: '1.7',
          fontFamily: theme('fontFamily.sans').join(', '),
          h1: { fontFamily: theme('fontFamily.display').join(', '), fontWeight: '460', letterSpacing: '-0.02em' },
          h2: { fontFamily: theme('fontFamily.display').join(', '), fontWeight: '500', letterSpacing: '-0.01em' },
          h3: { fontFamily: theme('fontFamily.display').join(', '), fontWeight: '500' },
          a: { textDecoration: 'none', borderBottom: '1px solid var(--color-primary)', fontWeight: '400' },
          'a:hover': { color: 'var(--color-primary)' },
          blockquote: {
            borderLeftWidth: '0',
            paddingLeft: '0',
            fontFamily: theme('fontFamily.display').join(', '),
            fontStyle: 'italic',
            fontSize: '1.375em',
            lineHeight: '1.5',
          },
          'blockquote p:first-of-type::before': { content: 'none' },
          'blockquote p:last-of-type::after': { content: 'none' },
          code: {
            fontFamily: theme('fontFamily.mono').join(', '),
            backgroundColor: 'var(--color-surface)',
            padding: '0.2em 0.4em',
            borderRadius: '4px',
            fontWeight: '400',
          },
          'code::before': { content: 'none' },
          'code::after': { content: 'none' },
          pre: {
            backgroundColor: '#0f0d0c',
            color: '#f1eeec',
            borderRadius: '4px',
          },
          'pre code': {
            backgroundColor: 'transparent',
            color: 'inherit',
            padding: '0',
            fontWeight: '400',
          },
        }

        const table = {
          table: {
            fontVariantNumeric: 'tabular-nums',
          },
          thead: {
            borderBottomWidth: '1px',
            borderBottomColor: 'var(--color-surface)',
          },
          'thead th': {
            fontFamily: theme('fontFamily.mono').join(', '),
            fontSize: '0.8125rem',
            fontWeight: '500',
            letterSpacing: '0.02em',
            color: 'var(--color-muted)',
            paddingTop: '0',
            paddingBottom: '0.75em',
            paddingInlineStart: '1.5em',
            paddingInlineEnd: '1.5em',
          },
          'thead th:first-child': { paddingInlineStart: '0' },
          'thead th:last-child': { paddingInlineEnd: '0' },
          'tbody tr': {
            borderBottomWidth: '1px',
            borderBottomColor: 'var(--color-surface)',
          },
          'tbody tr:last-child': { borderBottomWidth: '0' },
          'tbody td': {
            paddingTop: '0.75em',
            paddingBottom: '0.75em',
            paddingInlineStart: '1.5em',
            paddingInlineEnd: '1.5em',
          },
          'tbody td:first-child': { paddingInlineStart: '0' },
          'tbody td:last-child': { paddingInlineEnd: '0' },
          'thead th:not(:first-child), tbody td:not(:first-child)': {
            textAlign: 'right',
          },
        }

        return {
          DEFAULT: { css: { ...shared, ...table } },
          invert: { css: { ...shared, ...table } },
          lg: { css: table },
        }
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
