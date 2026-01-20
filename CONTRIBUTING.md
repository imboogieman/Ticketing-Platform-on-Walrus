# Contributing to Ticketing Platform on Walrus

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Maintain professional communication

## How to Contribute

### Reporting Bugs

1. Check if the bug is already reported in [Issues](https://github.com/imboogieman/Ticketing-Platform-on-Walrus/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (browser, OS, network)

### Suggesting Enhancements

1. Open an issue with the `enhancement` label
2. Clearly describe the feature
3. Explain why it would be useful
4. Provide examples of how it would work

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Ticketing-Platform-on-Walrus.git
   cd Ticketing-Platform-on-Walrus
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the coding standards (see below)
   - Add tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   # Test smart contracts
   cd move/ticketing_platform
   sui move test
   
   # Test frontend
   cd frontend
   npm install
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add feature: description of your changes"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Provide a clear description
   - Reference related issues
   - Include screenshots for UI changes

## Development Setup

### Prerequisites

- Sui CLI: https://docs.sui.io/build/install
- Node.js 18+: https://nodejs.org/
- Git: https://git-scm.com/

### Setup Steps

```bash
# Clone the repository
git clone https://github.com/imboogieman/Ticketing-Platform-on-Walrus.git
cd Ticketing-Platform-on-Walrus

# Smart Contracts
cd move/ticketing_platform
sui move build

# Frontend
cd ../../frontend
npm install
cp .env.example .env.local
# Edit .env.local with your configuration
npm run dev
```

## Coding Standards

### Smart Contracts (Move)

```move
// Use clear, descriptive names
public fun create_event(...) { }

// Add comments for complex logic
/// Creates a new event and returns the event object
public fun create_event(...) { }

// Proper error codes
const ENotOrganizer: u64 = 1;
const EEventEnded: u64 = 2;

// Emit events for important actions
event::emit(EventCreated { ... });
```

### Frontend (TypeScript/React)

```typescript
// Use TypeScript types
interface Event {
  id: string;
  name: string;
  // ...
}

// Functional components with proper typing
export function EventCard({ name, description }: EventCardProps) {
  // ...
}

// Meaningful variable names
const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

// Error handling
try {
  await signAndExecute({ transaction: tx });
} catch (error) {
  console.error('Transaction failed:', error);
  // User-friendly error message
}
```

### General Guidelines

- **Comments**: Add comments for complex logic only
- **Naming**: Use descriptive names (no abbreviations)
- **Functions**: Keep functions focused and small
- **DRY**: Don't repeat yourself - extract common code
- **Testing**: Add tests for new features
- **Documentation**: Update docs when changing features

## Project Structure

```
├── move/
│   └── ticketing_platform/
│       ├── sources/        # Smart contract source code
│       └── tests/          # Contract tests
├── frontend/
│   ├── app/                # Next.js pages
│   ├── components/         # Reusable React components
│   ├── lib/                # Utility libraries
│   └── utils/              # Helper functions
├── ARCHITECTURE.md         # Technical architecture
├── DEPLOYMENT.md          # Deployment guide
└── README.md              # Project overview
```

## Areas for Contribution

### Smart Contracts
- [ ] Refund mechanism
- [ ] Multi-tier ticket types
- [ ] Secondary marketplace
- [ ] Batch ticket purchases
- [ ] Event cancellation
- [ ] Ticket transfers with royalties

### Frontend
- [ ] Improved UI/UX design
- [ ] Event search and filtering
- [ ] User profiles
- [ ] Event analytics dashboard
- [ ] Mobile responsiveness
- [ ] Accessibility improvements
- [ ] Dark mode
- [ ] Internationalization (i18n)

### Integration
- [ ] Actual Seal encryption implementation
- [ ] Enhanced Walrus integration
- [ ] zkLogin implementation
- [ ] QR code generation and scanning
- [ ] Email notifications
- [ ] Calendar integration

### Documentation
- [ ] Video tutorials
- [ ] API documentation
- [ ] More code examples
- [ ] Translations
- [ ] FAQ expansion

### Testing
- [ ] More unit tests
- [ ] Integration tests
- [ ] E2E tests with Playwright
- [ ] Performance tests
- [ ] Security audits

## Review Process

1. **Automated Checks**: CI runs tests automatically
2. **Code Review**: Maintainers review your code
3. **Feedback**: Address any comments or suggestions
4. **Approval**: Once approved, PR will be merged
5. **Recognition**: Contributors acknowledged in releases

## Communication

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and general discussion
- **Discord**: Join the Sui Discord for community chat
- **Email**: Contact maintainers for sensitive issues

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be:
- Listed in release notes
- Acknowledged in the README
- Given credit in commit history

## Getting Help

- Read the documentation
- Check existing issues
- Ask in GitHub Discussions
- Join the Sui Discord community

## Questions?

Feel free to open an issue with the `question` label or reach out in discussions.

---

Thank you for contributing to the decentralized future! 🚀
