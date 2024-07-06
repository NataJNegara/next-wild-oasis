import SubmitButton from "@/app/_components/SubmitButton";
import { updateReservation } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { bookingId } = params;
  const reservation = await getBooking(bookingId);

  const { maxCapacity } = await getCabin(reservation.cabinId);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form
        className="flex flex-col gap-6 px-12 py-8 text-lg bg-primary-900"
        action={updateReservation}>
        <input type="hidden" value={reservation.id} name="bookingId" />

        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={reservation.numGuests}
            className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800"
            required>
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={reservation.observations}
            className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <SubmitButton title="Update reservation" loadingText="Updating..." />
        </div>
      </form>
    </div>
  );
}
