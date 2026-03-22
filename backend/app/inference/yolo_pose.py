from ultralytics import YOLO
import numpy as np

class YOLOPose:
    def __init__(self, model_path=None):
        # lightweight model for now (fast & easy)
        self.model = YOLO("yolov8n-pose.pt")

    def infer(self, frame):
        results = self.model(frame, verbose=False)[0]
        detections = []

        if results.keypoints is None:
            return detections

        boxes = results.boxes.xyxy.cpu().numpy()
        keypoints = results.keypoints.xy.cpu().numpy()

        for box, kpts in zip(boxes, keypoints):
            detections.append({
                "bbox": box,          # [x1, y1, x2, y2]
                "keypoints": kpts     # 17 pose keypoints
            })

        return detections
