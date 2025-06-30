export const otpMailContent = (otp: number) => {
  const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f9fc; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="90%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
              <!-- Header -->
              <tr>
                <td style="padding: 32px 32px 24px; text-align: center; border-bottom: 1px solid #f0f0f0;">
                  <h1 style="margin: 0; font-size: 24px; color: #2d3748;">🔐 Verify Your Email</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 32px;">
                  <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5;">Hello 👋,</p>
                  <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5;">Your One-Time Password (OTP) to verify your account is:</p>
                  
                  <!-- OTP Box with Copy Instructions -->
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 24px 0;">
                    <div style="font-family: monospace; font-size: 32px; font-weight: bold; color: #1a73e8; text-align: center; letter-spacing: 4px;">
                      ${otp}
                    </div>
                    <p style="margin: 12px 0 0; font-size: 13px; color: #64748b;">
                      <strong>To copy:</strong> Select the text above, then press Ctrl+C (Windows) or ⌘+C (Mac)
                    </p>
                  </div>
                  
                  <p style="margin: 0 Mackay 16px; font-size: 16px; line-height: 1.5;">If you did not request this, you can safely ignore this email.</p>
                  <p style="margin: 0; font-size: 14px; color: #718096;">This code will expire in 10 minutes for security reasons.</p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 24px 32px; background-color: #f9fafb; text-align: center; font-size: 14px; color: #718096;">
                  <p style="margin: 0;">© ${new Date().getFullYear()} The Pet Wala. All rights reserved.</p>
                  <p style="margin: 8px 0 0;">Need help? <a href="mailto:support@pastormentor.com" style="color: #4f46e5; text-decoration: none;">Contact our support team</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
  return htmlContent;
};

export const eMailVerificationContent = (otp: number) => {
  const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f9fc; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="90%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
              <!-- Header -->
              <tr>
                <td style="padding: 32px 32px 24px; text-align: center; border-bottom: 1px solid #f0f0f0;">
                  <h1 style="margin: 0; font-size: 24px; color: #2d3748;">🔐 Verify Your Email</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 32px;">
                  <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5;">Hello 👋,</p>
                  <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5;">Your One-Time Password (OTP) to verify your account is:</p>
                  
                  <!-- OTP Box with Copy Instructions -->
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 24px 0;">
                    <div style="font-family: monospace; font-size: 32px; font-weight: bold; color: #1a73e8; text-align: center; letter-spacing: 4px;">
                      ${otp}
                    </div>
                    <p style="margin: 12px 0 0; font-size: 13px; color: #64748b;">
                      <strong>To copy:</strong> Select the text above, then press Ctrl+C (Windows) or ⌘+C (Mac)
                    </p>
                  </div>
                  
                  <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.5;">If you did not request this, you can safely ignore this email.</p>
                  <p style="margin: 0; font-size: 14px; color: #718096;">This code will expire in 10 minutes for security reasons.</p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 24px 32px; background-color: #f9fafb; text-align: center; font-size: 14px; color: #718096;">
                  <p style="margin: 0;">© ${new Date().getFullYear()} The Pet Wala. All rights reserved.</p>
                  <p style="margin: 8px 0 0;">Need help? <a href="mailto:support@pastormentor.com" style="color: #4f46e5; text-decoration: none;">Contact our support team</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
  return htmlContent;
};

export const emailVerifyUrlContent = (url: string) => {
  const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f9fc; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="90%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
              <!-- Header -->
              <tr>
                <td style="padding: 32px 32px 24px; text-align: center; border-bottom: 1px solid #f0f0f0;">
                  <h1 style="margin: 0; font-size: 24px; color: #2d3748;">🔐 Verify Your Account</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 32px;">
                  <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5;">Hello 👋,</p>
                  <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5;">To verify your account, please click the button below:</p>
                  
                  <!-- CTA Button -->
                  <div style="text-align: center; margin: 32px 0;">
                    <a href="${url}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 6px; margin-bottom: 16px;">Verify Email</a>
                  </div>
                  
                  <!-- URL Box with Copy Instructions -->
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 24px 0;">
                    <p style="margin: 0 0 12px; font-size: 14px; color: #64748b;">Or copy and paste this link into your browser:</p>
                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 4px; padding: 12px; font-family: monospace; font-size: 14px; color: #334155; word-break: break-all;">
                      ${url}
                    </div>
                    <p style="margin: 12px 0 0; font-size: 13px; color: #64748b;">
                      <strong>To copy:</strong> Select the text above, then press Ctrl+C (Windows) or ⌘+C (Mac)
                    </p>
                  </div>
                  
                  <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.5;">If you didn't request this, you can safely ignore this email.</p>
                  <p style="margin: 0; font-size: 14px; color: #718096;">This link will expire in 1 hour for security reasons.</p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 24px 32px; background-color: #f9fafb; text-align: center; font-size: 14px; color: #718096;">
                  <p style="margin: 0;">© ${new Date().getFullYear()} The Pet Wala. All rights reserved.</p>
                  <p style="margin: 8px 0 0;">Need help? <a href="mailto:support@thepetwala.com" style="color: #4f46e5; text-decoration: none;">Contact our support team</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
  return htmlContent;
};

export const forgotPasswordVerifyUrlContent = (url: string) => {
  const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f9fc; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="90%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
              <!-- Header -->
              <tr>
                <td style="padding: 32px 32px 24px; text-align: center; border-bottom: 1px solid #f0f0f0;">
                  <h1 style="margin: 0; font-size: 24px; color: #2d3748;">Reset Your Password</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 32px;">
                  <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5;">Hello,</p>
                  <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5;">We received a request to reset your password for your The Pet Wala account. Click the button below to proceed:</p>
                  
                  <!-- CTA Button -->
                  <div style="text-align: center; margin: 32px 0;">
                    <a href="${url}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 6px; margin-bottom: 16px;">Reset Password</a>
                  </div>
                  
                  <!-- URL Box with Copy Instructions -->
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 24px 0;">
                    <p style="margin: 0 0 12px; font-size: 14px; color: #64748b;">Or copy and paste this link into your browser:</p>
                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 4px; padding: 12px; font-family: monospace; font-size: 14px; color: #334155; word-break: break-all;">
                      ${url}
                    </div>
                    <p style="margin: 12px 0 0; font-size: 13px; color: #64748b;">
                      <strong>To copy:</strong> Select the text above, then press Ctrl+C (Windows) or ⌘+C (Mac)
                    </p>
                  </div>
                  
                  <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.5;">If you didn't request this, you can safely ignore this email.</p>
                  <p style="margin: 0; font-size: 14px; color: #718096;">This link will expire in 1 hour for security reasons.</p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 24px 32px; background-color: #f9fafb; text-align: center; font-size: 14px; color: #718096;">
                  <p style="margin: 0;">© ${new Date().getFullYear()} The Pet Wala. All rights reserved.</p>
                  <p style="margin: 8px 0 0;">Need help? <a href="mailto:support@thepetwala.com" style="color: #4f46e5; text-decoration: none;">Contact our support team</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
  return htmlContent;
};


export const adminVerifyMentor = () => {
  const htmlContent = `
  <div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f9fc; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="90%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
            
            <!-- Header -->
            <tr>
              <td style="padding: 32px 32px 24px; text-align: center; border-bottom: 1px solid #f0f0f0;">
                <h1 style="margin: 0; font-size: 24px; color: #2d3748;">New Mentor Application Submitted</h1>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding: 32px;">
                <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5;">Dear Admin Team,</p>
                <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5;">
                  A new mentor application has been submitted and is ready for your review.
                  Please review the applicant's details and follow up with them as needed.
                </p>
                
                <p style="margin: 0 0 16px; font-size: 16px; line-height: 1.5;">
                  Thank you for your attention and support in helping us maintain a high-quality mentorship experience.
                </p>

                <p style="margin: 24px 0 0; font-size: 16px; line-height: 1.5;">
                  Best regards,<br />
                  <strong>The Pet Wala Team</strong>
                </p>
                
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="padding: 24px 32px; background-color: #f9fafb; text-align: center; font-size: 14px; color: #718096;">
                <p style="margin: 0;">© ${new Date().getFullYear()} The Pet Wala. All rights reserved.</p>
                <p style="margin: 8px 0 0;">Need help? <a href="mailto:support@theleadup.com" style="color: #4f46e5; text-decoration: none;">Contact our support team</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`;
  return htmlContent;
};

export const generateUserCreationEmail = (text: string, fullName: string, email: string, password: string) => {
  const htmlContent = `
  <div style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f9fc; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="90%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
            
            <!-- Header -->
            <tr>
              <td style="padding: 32px 32px 24px; text-align: center; border-bottom: 1px solid #f0f0f0;">
                <h1 style="margin: 0; font-size: 24px; color: #2d3748;">${text} Created Successfully</h1>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding: 32px;">
                <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.5;">
                  Here are the temporary user credentials:
                </p>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Full Name:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Email:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Password:</td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${password}</td>
                  </tr>
                </table>

                <p style="margin: 24px 0 0; font-size: 16px; line-height: 1.5;">
                  Please change your password upon first login for security reasons.
                </p>

                <p style="margin: 24px 0 0; font-size: 16px; line-height: 1.5;">
                  Best regards,<br />
                  <strong>The Pet Wala Team</strong>
                </p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="padding: 24px 32px; background-color: #f9fafb; text-align: center; font-size: 14px; color: #718096;">
                <p style="margin: 0;">© ${new Date().getFullYear()} The Pet Wala. All rights reserved.</p>
                <p style="margin: 8px 0 0;">Need help? <a href="mailto:support@theleadup.com" style="color: #4f46e5; text-decoration: none;">Contact our support team</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
  `;
  return htmlContent;
};
