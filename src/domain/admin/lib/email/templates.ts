
import 'server-only';

function escapeHtml(value: string): string {
    return value.replace(/[&<>"']/g, (char) => {
        const entities: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        };

        return entities[char];
    });
}

function emailLayout(title: string, content: string): string {
    return `
    <!doctype html>
    <html lang="vi">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin:0;padding:24px;background:#f3f4f6;font-family:Arial,sans-serif;color:#1f2937">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden">
          <div style="padding:24px 32px;background:#172554;color:#ffffff">
            <p style="margin:0;font-size:13px;letter-spacing:1px">LẠC MINH STUDIO</p>
            <h1 style="margin:12px 0 0;font-size:24px">${escapeHtml(title)}</h1>
          </div>
          <div style="padding:32px;line-height:1.7">
            ${content}
          </div>
          <div style="padding:18px 32px;background:#f9fafb;color:#6b7280;font-size:12px">
            Email tự động từ hệ thống quản trị Lạc Minh Studio.
            Nếu bạn cho rằng email này được gửi nhầm, hãy liên hệ quản trị viên.
          </div>
        </div>
      </body>
    </html>
  `;
}

function actionButton(label: string, url: string): string {
    return `
    <p style="margin:28px 0">
      <a href="${escapeHtml(url)}"
         style="display:inline-block;padding:12px 20px;background:#1d4ed8;color:#ffffff;text-decoration:none;border-radius:6px;font-weight:bold">
        ${escapeHtml(label)}
      </a>
    </p>
  `;
}

export function welcomeTemplate(input: {
    fullName: string;
    email: string;
}) {
    const name = escapeHtml(input.fullName);
    return emailLayout(
        'Tài khoản nhân sự đã được tạo',
        `
          <h2 style="color:#111827;">Xin chào ${escapeHtml(name)},</h2>

          <p>
            Tài khoản của bạn tại <strong>Lạc Minh Studio</strong>
            đã được tạo thành công.
          </p>

          <p><strong>Thông tin đăng nhập</strong></p>

          <div style="background:#f3f4f6;padding:16px;border-radius:8px;">
            <p>Email: <strong>${escapeHtml(name)}</strong></p>
            <p>Mật khẩu mặc định: <strong>password123</strong></p>
          </div>

          <p>
            Vui lòng đăng nhập vào hệ thống và đổi mật khẩu ngay sau lần
            đăng nhập đầu tiên để bảo vệ tài khoản.
          </p>

          <p>
            Nếu bạn không mong đợi tài khoản này, hãy liên hệ quản trị viên.
          </p>
        `,
    );

}

export function superAdminAlertTemplate(input: {
    fullName: string;
    actorName: string;
    dashboardUrl: string;
}) {
    return emailLayout(
        'Cảnh báo thay đổi quyền quản trị',
        `
      <p>Xin chào ${escapeHtml(input.fullName)},</p>
      <p>Tài khoản của bạn vừa được nâng quyền lên
      <strong style="color:#b91c1c">SUPER_ADMIN</strong>.</p>
      <p>Người thực hiện: <strong>${escapeHtml(input.actorName)}</strong>.</p>
      <p>Nếu thay đổi này không được bạn mong đợi, hãy liên hệ quản trị viên phụ trách ngay.</p>
      ${actionButton('Mở Admin Portal', input.dashboardUrl)}
    `,
    );
}

export function accountStatusTemplate(input: {
    fullName: string;
    actorName: string;
    status: 'Active' | 'Inactive';
    dashboardUrl: string;
}) {
    const blocked = input.status === 'Inactive';
    const statusLabel = blocked ? 'bị khóa' : 'được mở khóa';
    const heading = blocked
        ? 'Thông báo khóa tài khoản'
        : 'Thông báo mở khóa tài khoản';

    return emailLayout(
        heading,
        `
      <p>Xin chào ${escapeHtml(input.fullName)},</p>
      <p>Tài khoản của bạn đã ${statusLabel} trên hệ thống quản trị.</p>
      <p>Trạng thái mới:
        <strong style="color:${blocked ? '#b91c1c' : '#15803d'}">
          ${blocked ? 'Inactive — Bị khóa' : 'Active — Hoạt động'}
        </strong>
      </p>
      <p>Người thực hiện: <strong>${escapeHtml(input.actorName)}</strong>.</p>
      ${blocked
            ? '<p>Bạn có thể không truy cập được hệ thống trong thời gian tài khoản bị khóa.</p>'
            : '<p>Bạn có thể đăng nhập lại nếu tài khoản đáp ứng các điều kiện truy cập.</p>'
        }
      ${actionButton('Mở Admin Portal', input.dashboardUrl)}
    `,
    );
}
