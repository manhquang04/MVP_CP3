const SYSTEM_PROMPT = `Bạn là AI chuyên gia lập kế hoạch du lịch chuyên nghiệp.

Nhiệm vụ của bạn là tạo lịch trình du lịch nhiều ngày hợp lý và thực tế.

Nguyên tắc bắt buộc:

1. Gom các địa điểm theo khu vực gần nhau để tránh di chuyển lòng vòng.
2. Không được zig-zag qua lại giữa các khu vực xa nhau trong cùng 1 ngày.
3. Thời gian phải sắp xếp theo thứ tự hợp lý.
4. Bữa sáng gần khách sạn.
5. Bữa trưa gần khu vực tham quan buổi trưa.
6. Bữa tối ở khu vực phù hợp buổi tối.
7. Đề xuất 1 khách sạn trung tâm làm base cho toàn bộ chuyến đi.
8. Khách sạn và nhà hàng phải phù hợp với mức ngân sách.
9. Tôn trọng phong cách du lịch:
   - relaxed = ít hoạt động, nhịp độ chậm
   - balanced = vừa phải
   - packed = nhiều hoạt động, lịch dày
10. Mỗi hoạt động phải có thời lượng ước tính.
11. BẮT BUỘC có latitude và longitude cho tất cả địa điểm.
12. Mô tả ngắn gọn (tối đa 2 câu).
13. Chỉ trả về JSON hợp lệ.
14. Không thêm giải thích ngoài JSON.
15. Không dùng markdown.`;

const USER_PROMPT_CREATE = `Tạo lịch trình du lịch với thông tin sau:

Điểm đến: {{destination}}
Số ngày: {{days}}
Ngân sách: {{budget}} (low / medium / high)
Phong cách du lịch: {{style}} (relaxed / balanced / packed)
Yêu cầu thêm: {{preferences}}

Yêu cầu:

1. Bao gồm:
   - 1 khách sạn trung tâm cho toàn bộ chuyến đi
   - Bữa sáng, trưa, tối mỗi ngày
   - Hoạt động tham quan giữa các bữa ăn

2. Trả về JSON theo đúng cấu trúc:

{
  "trip_summary": {
    "destination": "",
    "days": 0,
    "budget_level": "",
    "style": ""
  },
  "hotel": {
    "name": "",
    "address": "",
    "price_level": "",
    "estimated_price_vnd": "",
    "description": "",
    "lat": 0,
    "lng": 0
  },
  "days": [
    {
      "day": 1,
      "area": "",
      "activities": [
        {
          "time": "HH:mm",
          "title": "",
          "type": "hotel | food | sightseeing | nature | shopping | cafe | entertainment",
          "description": "",
          "address": "",
          "lat": 0,
          "lng": 0,
          "estimated_duration_minutes": 0,
          "estimated_cost_vnd": ""
        }
      ]
    }
  ]
}

Quy tắc:
- Thời gian trong mỗi ngày phải theo thứ tự tăng dần.
- Không trùng địa điểm.
- Đảm bảo logic địa lý.
- estimated_cost_vnd: ước tính chi phí VND cho mỗi hoạt động (VD: "50.000 - 100.000", "150.000/người").
- estimated_price_vnd: giá khách sạn (VD: "800.000 - 1.200.000/đêm").
- Chi phí phải phù hợp mức ngân sách (low/medium/high).
- Trả về JSON hợp lệ duy nhất.`;

const USER_PROMPT_EDIT = `Đây là lịch trình hiện tại (JSON):

{{current_itinerary_json}}

Người dùng yêu cầu thay đổi:
"{{change_instruction}}"

Hãy chỉnh sửa lịch trình theo yêu cầu.

Quy tắc:
- Giữ nguyên những phần không liên quan.
- Không phá vỡ cấu trúc JSON.
- Giữ logic địa lý hợp lý.
- Không xóa khách sạn trừ khi được yêu cầu.
- Chỉ trả về JSON hợp lệ.`;

function buildCreatePrompt(destination, days, budget, style, preferences) {
  return USER_PROMPT_CREATE
    .replace('{{destination}}', destination)
    .replace('{{days}}', String(days))
    .replace('{{budget}}', budget)
    .replace('{{style}}', style)
    .replace('{{preferences}}', preferences || 'Không có');
}

function buildEditPrompt(currentJson, changeInstruction) {
  return USER_PROMPT_EDIT
    .replace('{{current_itinerary_json}}', currentJson)
    .replace('{{change_instruction}}', changeInstruction);
}

function extractJson(text) {
  if (!text || typeof text !== 'string') return null;
  let cleaned = text.trim();
  // Remove markdown code block if present
  const codeBlock = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlock) cleaned = codeBlock[1].trim();
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error('JSON parse error:', e);
    }
  }
  return null;
}

module.exports = {
  SYSTEM_PROMPT,
  USER_PROMPT_CREATE,
  USER_PROMPT_EDIT,
  buildCreatePrompt,
  buildEditPrompt,
  extractJson,
};
