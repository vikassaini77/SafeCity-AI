import math

class EventEngine:
    def __init__(self):
        self.prev_centers = {}

    def _center(self, bbox):
        x1, y1, x2, y2 = bbox
        return ((x1 + x2) / 2, (y1 + y2) / 2)

    def detect(self, tracks):
        events = []

        active_tracks = [t for t in tracks if t.is_confirmed()]

        # store centers
        centers = {}
        for t in active_tracks:
            bbox = t.to_ltrb()
            centers[t.track_id] = self._center(bbox)

        # check pairwise interaction
        for i in range(len(active_tracks)):
            for j in range(i + 1, len(active_tracks)):
                t1 = active_tracks[i]
                t2 = active_tracks[j]

                c1 = centers[t1.track_id]
                c2 = centers[t2.track_id]

                dist = math.dist(c1, c2)

                # VERY CLOSE + both moving
                if dist < 100:
                    events.append({
                        "event": "VIOLENCE",
                        "tracks": [t1.track_id, t2.track_id]
                    })

        return events
