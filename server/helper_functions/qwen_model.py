# from transformers import Qwen2_5_VLForConditionalGeneration, AutoProcessor
# from qwen_vl_utils import process_vision_info
# import torch
#
# # Load model and processor once
# model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
#     "Qwen/Qwen2.5-VL-32B-Instruct", torch_dtype="auto", device_map="auto"
# )
# processor = AutoProcessor.from_pretrained("Qwen/Qwen2.5-VL-32B-Instruct")
#
#
# def evaluate_images_with_qwen(images: list, prompt: str = "Evaluate this answer."):
#     # Prepare messages with images and prompt
#     messages = [{"role": "user", "content": [{"type": "text", "text": prompt}]}]
#
#     for image_url in images:
#         messages.append({"role": "user", "content": [{"type": "image", "image": image_url}]})
#
#     # Prepare inputs
#     text = processor.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
#     image_inputs, video_inputs = process_vision_info(messages)
#     inputs = processor(text=[text], images=image_inputs, videos=video_inputs, padding=True, return_tensors="pt")
#     inputs = inputs.to("cuda")
#
#     # Generate output
#     generated_ids = model.generate(**inputs, max_new_tokens=128)
#     generated_ids_trimmed = [
#         out_ids[len(in_ids):] for in_ids, out_ids in zip(inputs.input_ids, generated_ids)
#     ]
#     output_texts = processor.batch_decode(generated_ids_trimmed, skip_special_tokens=True, clean_up_tokenization_spaces=False)
#
#     return output_texts
