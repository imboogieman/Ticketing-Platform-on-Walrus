# Security Policy

## Supported Versions

We are committed to maintaining the security of this project. The following versions are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Updates

### January 2026 - Next.js Security Patches

**Date**: 2026-01-20  
**Severity**: Critical  
**Component**: Frontend (Next.js)

**Issue**: Multiple security vulnerabilities in Next.js 14.0.4

**Vulnerabilities Addressed**:
1. Denial of Service with Server Components (CVE pending)
2. Authorization Bypass (CVE pending)
3. Cache Poisoning (CVE pending)
4. Server-Side Request Forgery in Server Actions (CVE pending)
5. Authorization Bypass in Middleware (CVE pending)

**Resolution**: Updated Next.js from version 14.0.4 to 14.2.35

**Impact**: All users of the frontend application should update to the latest version immediately.

**Action Required**: 
```bash
cd frontend
npm install next@14.2.35
npm install
```

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it responsibly:

### How to Report

1. **DO NOT** open a public GitHub issue for security vulnerabilities
2. Email the maintainers directly (check repository for contact info)
3. Include detailed information about the vulnerability:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### What to Expect

- **Acknowledgment**: Within 48 hours of report
- **Initial Assessment**: Within 1 week
- **Updates**: Regular updates on progress
- **Resolution**: Aim to resolve critical issues within 30 days
- **Credit**: Security researchers will be credited (unless they prefer anonymity)

## Security Best Practices

### For Smart Contracts

1. **Audit Before Deployment**: Always audit smart contracts before mainnet deployment
2. **Test on Testnet**: Thoroughly test on testnet before going to production
3. **Access Control**: Verify organizer-only functions are properly protected
4. **Input Validation**: All user inputs are validated on-chain
5. **Reentrancy Protection**: Sui's object model provides reentrancy protection by design

### For Frontend

1. **Environment Variables**: Never commit `.env` files with sensitive data
2. **Dependencies**: Keep dependencies up to date
3. **HTTPS Only**: Always use HTTPS in production
4. **Input Sanitization**: Sanitize all user inputs
5. **Wallet Security**: Never request seed phrases or private keys

### For Deployment

1. **Secure Keys**: Use hardware wallets for mainnet deployments
2. **Access Control**: Limit who can deploy contracts
3. **Monitoring**: Monitor contract events for suspicious activity
4. **Rate Limiting**: Implement rate limiting on frontend
5. **Regular Updates**: Keep all dependencies updated

## Security Features

### Smart Contract Security

- ✅ **Access Control**: Organizer-only functions protected
- ✅ **Payment Validation**: Correct payment amounts enforced
- ✅ **Ownership Verification**: NFT ownership verified on-chain
- ✅ **Immutable Records**: Event data permanently recorded
- ✅ **No Reentrancy**: Sui's object model prevents reentrancy attacks

### Data Security

- ✅ **Encryption**: Seal encryption for sensitive ticket data
- ✅ **Decentralized Storage**: Walrus prevents single point of failure
- ✅ **On-Chain Verification**: All transactions verifiable on-chain
- ✅ **Privacy**: zkLogin support for privacy-preserving auth

### Frontend Security

- ✅ **Type Safety**: TypeScript prevents type-related vulnerabilities
- ✅ **Input Validation**: All inputs validated before submission
- ✅ **Secure Wallet Integration**: Using official Sui wallet SDK
- ✅ **No Private Key Storage**: Wallet handles all key management

## Known Limitations

1. **Walrus Availability**: Depends on Walrus network uptime
2. **Gas Fees**: Users must have SUI tokens for transactions
3. **Seal Implementation**: Current implementation uses placeholder encryption
4. **zkLogin**: Framework in place but needs full implementation

## Disclosure Policy

When a security issue is resolved:

1. Issue is fixed in the codebase
2. Patch is released
3. Security advisory is published
4. CVE is requested if applicable
5. Community is notified

## Compliance

This project follows:

- OWASP Top 10 best practices
- Sui smart contract security guidelines
- Web3 security standards
- Responsible disclosure practices

## Security Checklist for Contributors

Before submitting code:

- [ ] No hardcoded secrets or credentials
- [ ] Dependencies are up to date
- [ ] Input validation is implemented
- [ ] Access control is properly enforced
- [ ] Error messages don't leak sensitive info
- [ ] Tests cover security-critical code
- [ ] No use of deprecated functions
- [ ] Code has been reviewed for vulnerabilities

## Resources

- [Sui Security Best Practices](https://docs.sui.io/learn/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web3 Security Guide](https://www.web3security.info/)
- [Smart Contract Security](https://consensys.github.io/smart-contract-best-practices/)

## Contact

For security issues, please contact the maintainers through:
- GitHub Security Advisories
- Direct email (see repository for contact)

---

**Last Updated**: January 20, 2026  
**Next Review**: February 20, 2026
