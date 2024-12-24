import type { Config } from "tailwindcss";

import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addVariablesForColors({ addBase, theme }: any) {
	const allColors = flattenColorPalette(theme("colors"));
	const newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
  	    extend: {
  		    animation: {
  			    spotlight: 'spotlight 2s ease .75s 1 forwards',
      			rainbow: 'rainbow var(--speed, 2s) infinite linear'
  	    	},
  		    keyframes: {
  			    spotlight: {
  				    '0%': {
  					    opacity: '0',
      					transform: 'translate(-72%, -62%) scale(0.5)'
  	    			},
  		    		'100%': {
  			    		opacity: '1',
  				     	transform: 'translate(-50%,-40%) scale(1)'
  				    }
      			},
  	    		rainbow: {
  		    		'0%': {
  			    		'background-position': '0%'
  				    },
      				'100%': {
  	    				'background-position': '200%'
  		    		}
  			    }
      		},
  	    	borderRadius: {
  		    	lg: 'var(--radius)',
  			    md: 'calc(var(--radius) - 2px)',
      			sm: 'calc(var(--radius) - 4px)'
  	    	},
  		    colors: {
  			    background: 'hsl(var(--background))',
      			foreground: 'hsl(var(--foreground))',
  	    		card: {
  		    		DEFAULT: 'hsl(var(--card))',
  			    	foreground: 'hsl(var(--card-foreground))'
      			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			'color-1': 'hsl(var(--color-1))',
  			'color-2': 'hsl(var(--color-2))',
  			'color-3': 'hsl(var(--color-3))',
  			'color-4': 'hsl(var(--color-4))',
  			'color-5': 'hsl(var(--color-5))'
  		},
		boxShadow: {
			input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
	    },
  	}
  },
  plugins: [
	require("tailwindcss-animate"),
	addVariablesForColors
],
};
export default config;
