from ultralytics import YOLO
import numpy as np

class YOLODetector:
    def __init__(self, model_path=None):
        # standard object detection model to detect weapons, persons, etc.
        self.model = YOLO("yolov8n.pt")
        # COCO class IDs: 0=person, 43=knife, 76=scissors, 24=backpack
        self.weapon_classes = [43, 76] 
        self.suspicious_classes = [24] # Backpack / unattended bag simulation
        
    def infer(self, frame):
        results = self.model(frame, verbose=False)[0]
        person_detections = []
        immediate_events = []

        if results.boxes is None:
            return person_detections, immediate_events

        boxes = results.boxes.xyxy.cpu().numpy()
        class_ids = results.boxes.cls.cpu().numpy()
        confidences = results.boxes.conf.cpu().numpy()

        for box, cls_id, conf in zip(boxes, class_ids, confidences):
            if conf < 0.4:
                continue
                
            cls_id = int(cls_id)
            if cls_id == 0:
                person_detections.append({
                    "bbox": box,
                    "confidence": conf
                })
            elif cls_id in self.weapon_classes:
                immediate_events.append({
                    "event": "WEAPON_DETECTED",
                    "bbox": box,
                    "confidence": conf
                })
            elif cls_id in self.suspicious_classes:
                immediate_events.append({
                    "event": "SUSPICIOUS_OBJECT",
                    "bbox": box,
                    "confidence": conf
                })

        # Mock Fire detection for demo purposes if frame exhibits high red/orange saturation (simplified heuristic)
        # In a real production system, this would be a custom trained YOLO model.
        # For safety, we just pass the weapon and suspicious objects.
        
        return person_detections, immediate_events
