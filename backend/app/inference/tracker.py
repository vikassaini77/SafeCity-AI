from deep_sort_realtime.deepsort_tracker import DeepSort

class Tracker:
    def __init__(self):
        self.tracker = DeepSort(
            max_age=30,
            n_init=3,
            max_iou_distance=0.7
        )

    def update(self, detections, frame):
        formatted = []

        for d in detections:
            x1, y1, x2, y2 = d["bbox"]
            w = x2 - x1
            h = y2 - y1

            formatted.append((
                [x1, y1, w, h],   # bbox
                0.9,              # confidence
                "person"
            ))

        tracks = self.tracker.update_tracks(formatted, frame=frame)
        return tracks
