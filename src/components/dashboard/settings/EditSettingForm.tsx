import { useState } from "react";
import { toast } from "react-toastify";
import { type EditRunningLowSettingError, type RunningLowSetting, useRunningLow } from "shelflife-react-hooks";

type Props = {
    setting: RunningLowSetting
}

export default function EditSettingForm({ setting }: Props) {
    const { editSetting } = useRunningLow();
    const [runsLowAt, setRunsLowAt] = useState<number>(setting.runningLow);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await editSetting(setting.storage.id, setting.id, { runningLow: runsLowAt });

        } catch (err: any) {
            const error = err as EditRunningLowSettingError;

            if (error && error.runningLow) {
                toast.error(error.runningLow);
                return;
            }
        }

        toast.success("Changes successfully saved")
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Edit {setting?.product.name}</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="w-full flex flex-row items-center">
                        <label className="label">
                            <span className="label-text font-semibold me-2">Runs low at</span>
                        </label>
                    </div>
                    <input
                        type="number"
                        maxLength={40}
                        className="input w-full input-bordered mr-2"
                        value={runsLowAt}
                        min={0}
                        onChange={(e) => setRunsLowAt(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={setting?.runningLow === runsLowAt} className="btn btn-primary w-full">Save Changes</button>
                </div>
            </form>
        </div>
    );
}