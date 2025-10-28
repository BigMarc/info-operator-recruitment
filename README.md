# Info Operator Quiz Funnels

Interactive quiz funnels for Info Operator Recruitment with 3 variants targeting different customer segments. Built with Next.js, TypeScript, and Framer Motion.

## 🎯 Overview

This project contains 3 distinct quiz funnel variants designed to convert visitors into leads for Info Operator Recruitment. Each funnel is tailored to different customer segments and includes smooth animations, form validation, and calendar integration.

## 🚀 Features

- **3 Quiz Variants**: Each targeting different customer segments
- **German Language**: All content in German for German-speaking market
- **Interactive Design**: Smooth animations with Framer Motion
- **Mobile-First**: Fully responsive design
- **Form Validation**: Client-side validation with error handling
- **Calendar Integration**: Success pages with booking functionality
- **Data Storage**: localStorage for quiz answers and contact data
- **TypeScript**: Full type safety throughout

## 📊 Quiz Variants

### V1 - Career Change Focus (`/v1`)
- **Target**: People seeking new career challenges
- **Questions**: 3 questions about career change, marketing experience, and influencer collaboration
- **Color Scheme**: Blue/Purple gradient
- **Perfect for**: Career changers and those looking for new opportunities

### V2 - Income Potential Focus (`/v2`)
- **Target**: People wanting to build a second income stream
- **Questions**: 5 questions about income goals, age, following instructions, and employment status
- **Color Scheme**: Green/Teal gradient
- **Perfect for**: Those seeking additional income sources

### V3 - Partnership Readiness Focus (`/v3`)
- **Target**: People ready to partner with content creators
- **Questions**: 4 questions about creator collaboration, business models, time investment, and experience
- **Color Scheme**: Orange/Red gradient
- **Perfect for**: Those ready for creator partnerships

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Images**: Unsplash integration with Next.js Image optimization
- **Icons**: Lucide React

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/BigMarc/info-operator-quiz-funnels.git
   cd info-operator-quiz-funnels
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                          # Next.js app directory
│   ├── quiz/                     # Quiz index page
│   ├── v1/                       # V1 funnel pages
│   │   ├── page.tsx             # Question 1
│   │   ├── q2/page.tsx          # Question 2
│   │   ├── q3/page.tsx          # Question 3
│   │   ├── contact/page.tsx     # Contact form
│   │   └── success/page.tsx     # Success page
│   ├── v2/                       # V2 funnel pages (5 questions)
│   └── v3/                       # V3 funnel pages (4 questions)
├── components/
│   ├── quiz/                     # Shared quiz components
│   │   ├── AnswerButton.tsx     # Answer option component
│   │   ├── ContactForm.tsx      # Contact form component
│   │   ├── ProgressBar.tsx      # Progress indicator
│   │   ├── QuestionCard.tsx     # Question display component
│   │   ├── QuizLayout.tsx       # Layout wrapper
│   │   ├── SuccessPage.tsx      # Success page component
│   │   └── types.ts             # TypeScript definitions
│   └── ...other components
└── ...config files
```

## 🎨 Design Features

- **Gradient Backgrounds**: Each variant has unique color schemes
- **Unsplash Images**: High-quality images for each answer option
- **Smooth Animations**: Page transitions and hover effects
- **Progress Tracking**: Visual progress bars for each funnel
- **Form Validation**: Real-time validation with error messages
- **Responsive Cards**: Answer options as large, clickable cards

## 📱 Usage

### Accessing Quiz Funnels

1. **Quiz Index**: Visit `/quiz` to see all available quiz variants
2. **Direct Access**: Navigate directly to `/v1`, `/v2`, or `/v3`
3. **Flow**: Each funnel follows: Questions → Contact Form → Success Page

### Data Collection

- **Quiz Answers**: Stored in localStorage with keys `quiz-v1-answers`, `quiz-v2-answers`, `quiz-v3-answers`
- **Contact Data**: Stored in localStorage with keys `quiz-v1-contact`, `quiz-v2-contact`, `quiz-v3-contact`
- **No Backend**: All data stored client-side for simplicity

## 🔧 Customization

### Adding New Questions
1. Edit the question object in the respective page file
2. Update the `totalSteps` prop in QuestionCard components
3. Add new answer options with Unsplash image URLs

### Styling Changes
- Modify color schemes in component files
- Update gradients in `getVariantGradient()` functions
- Customize animations in Framer Motion components

### Content Updates
- Edit question text in page files
- Update success messages in `SuccessPage.tsx`
- Modify contact form labels in `ContactForm.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push
3. Environment variables not required (client-side only)

### Other Platforms
- **Netlify**: Use `npm run build` and deploy the `out/` directory
- **AWS Amplify**: Connect your GitHub repository
- **Manual**: Run `npm run build` and serve the `out/` directory

## 📈 Performance

- **Core Web Vitals**: Optimized for excellent LCP, FID, and CLS scores
- **Image Optimization**: Next.js Image component with Unsplash integration
- **Bundle Size**: Minimal dependencies for fast loading
- **Mobile Performance**: Optimized for mobile devices

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support or questions, please open an issue in the GitHub repository.

---

Built with ❤️ using Next.js, TypeScript, and Framer Motion